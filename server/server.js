const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

// const https = require('https');
require('dotenv').config();
const fs = require('fs');

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/shelterData', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Define a mongoose model for the scraped data
const Organization = mongoose.model('Organization', {
  name: String,
  address: String,
  hours: String,
  client_Group: String,
  lat: Number,
  lng: Number,
});

// Define a mongoose model for the scraped data
const Metrics = mongoose.model('Metrics', {
  organization_Name: String,
  overnight_Service_Type: String,
  program_Model: String,
  service_User_Count: Number,
  capacity_Actual_Room: Number,
});

// Define the DELETE endpoint to delete the entire organizations database
app.delete('/api/deleteOrganizationsDB', async (req, res) => {
  try {
    // Delete all documents in the Organization collection
    await Organization.deleteMany({});
    
    // If you want to delete the entire database, uncomment the line below
    // await mongoose.connection.db.dropDatabase();

    console.log('Organization Database deleted successfully');
    res.json({ message: 'Organization Database deleted successfully' });
  } catch (error) {
    console.error('Error deleting database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the DELETE endpoint to delete the entire database
app.delete('/api/deleteMetricsDB', async (req, res) => {
  try {
    // Delete all documents in the Metrics collection
    await Metrics.deleteMany({});
    
    console.log('Metrics Database deleted successfully');
    res.json({ message: 'Metrics Database deleted successfully' });
  } catch (error) {
    console.error('Error deleting database:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

function extractValue(line) {
  // Check if the line exists and extract the value after the colon
  return line ? line.split(':').slice(1).join(':').trim() : line;
}

// Scraping route
app.get('/api/scrape', async (req, res) => {
  try {
    // Scraping URL
    const response = await axios.get('https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/');
    const $ = cheerio.load(response.data);

    // Extract information based on your HTML structure
    const scrapedOrganizations = [];

    // Extracting organization information
    $('tr[data-lat][data-lng]').each((index, element) => {
      const organizationName = $(element).find('td:first-child').text().trim();
      const organizationDetails = $(element).find('td:nth-child(2)').text().trim();
      console.log(organizationDetails);

      const detailsArray = organizationDetails.split('\n').map(line => line.trim());

      scrapedOrganizations.push({
        name: organizationName,
        details: organizationDetails,
        address: extractValue(detailsArray.find(line => line.startsWith('Address:'))),
        hours: extractValue(detailsArray.find(line => line.startsWith('Hours:'))),
        client_Group: extractValue(detailsArray.find(line => line.startsWith('Client Group:'))),
        lat: 0,
        lng: 0,
      });
    });
    
    // Save the extracted data to MongoDB
    const savedData = await Organization.insertMany(scrapedOrganizations);

    res.json({ message: 'Scraping successful!', data: savedData });
  } catch (error) {
    console.error('Error scraping data:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Define the GET endpoint to fetch organizations
app.get('/api/organizations', async (req, res) => {
  try {
    // Retrieve organizations from MongoDB
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    console.error('Error fetching organizations:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Geocoding function
async function geocodeAddress(address) {
  try {
    const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
    const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}&sensor=true`;
    // console.log("encodeURIComponent", encodeURIComponent(address));
    const response = await axios.get(geocodingUrl);

    console.log(response.data.status);

    if (response.data.status === 'OK') {
      const location = response.data.results[0].geometry.location;
      return { lat: location.lat, lng: location.lng };
    } else {
      throw new Error('Geocoding failed');
    }
  } catch (error) {
    throw new Error('Error during geocoding: ' + error.message);
  }
}

// Route to geocode an address and store it in MongoDB
app.put('/api/geocode', async (req, res) => {
  try {
    // Retrieve organizations from MongoDB
    const organizations = await Organization.find();
    // console.log("req", organizations);

    for (const item of organizations) {
      const address = item.address;

      if (!address) {
        throw new Error('Address is required');
      }

      const { lat, lng } = await geocodeAddress(address);
      // console.log("lat, lng ", lat, lng );

      item.lat = lat;
      item.lng = lng;

      await item.save();
    }

    res.json({ message: 'Geocoding successful!', data: organizations });
  } catch (error) {
    console.error('Error during geocoding:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Function to download JSON objects from a URL
async function downloadJsonFromUrl(url, destinationPath) {
  try {
    const response = await axios.get(url);
    fs.writeFileSync(destinationPath, JSON.stringify(response.data, null, 2));
    console.log(`Downloaded JSON from ${url} to ${destinationPath}`);
  } catch (error) {
    console.error(`Error downloading JSON from ${url}: ${error.message}`);
  }
}

// GET endpoint for CKAN api for shelter metrics  
app.get('/api/shelterMetrics', async (req, res) => {
  const packageId = '21c83b32-d5a8-4106-a54f-010dbe49f6f2';
  const CKAN_API_URL = 'https://ckan0.cf.opendata.inter.prod-toronto.ca/api/3/action/package_show';

  try {
    const response = await axios.get(`${CKAN_API_URL}?id=${packageId}`);
    const packageInfo = response.data.result;
    
    // only take JSON resources
    const jsonResources = packageInfo.resources.filter((resource) => resource.format === 'JSON');

    for (const jsonResource of jsonResources) {
      await downloadJsonFromUrl(jsonResource.url, `./downloads/${jsonResource.name}`);
    }
    console.log('Downloaded all JSON resources');

    // Filter metrics data from downloaded JSON files
    const shelterMetrics = await readShelter();
    // console.log('Read JSON file', shelterMetrics);

    // Add metrics in Mongo database
    const savedData = await Metrics.insertMany(shelterMetrics);
    console.log('Shelter metrics added to MongoDB');  

    res.json({ message: 'JSON download successful!', data: savedData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching package information' });
  }
});

// Function to read daily updated shelters from a JSON file
async function readShelter(numObjects = 7) {
  const filename = 'Daily shelter overnight occupancy.json';
  const filePath = `./downloads/${filename}`;
  
  try {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const jsonData = JSON.parse(fileContent);
  
    // Filter objects where PROGRAM_NAME doesn't start with the same word
    const filteredObjects = jsonData.filter(obj => {
      const programName = obj.PROGRAM_NAME || ''; // Handle case where PROGRAM_NAME is null or undefined
      const firstWord = programName.split(' ')[0];
      return firstWord !== programName;
    });

    // Extract unique organization names
    const uniqueOrganizationNames = [...new Set(filteredObjects.map(obj => obj.ORGANIZATION_NAME))];
    // console.log('uniqueOrganizationNames', uniqueOrganizationNames);

    // Initialize a map to track the first occurrence of each unique organization name
    const firstOccurrenceMap = new Map();

    counter = 0;

    // Iterate through the filtered objects and keep only the first occurrence for each unique organization name
    filteredObjects.forEach(obj => {
      const organizationName = obj.ORGANIZATION_NAME;
      if (!firstOccurrenceMap.has(organizationName)) {
        firstOccurrenceMap.set(organizationName, obj);
        counter += 1;
      }
    });

    // Extract the first 7 unique organizations
    const firstFilteredObjects = Array.from(firstOccurrenceMap.values()).slice(0, numObjects);

    // Transform objects to match the specified schema
    const transformedObjects = firstFilteredObjects.map(obj => ({
      organization_Name: obj.ORGANIZATION_NAME || '',
      overnight_Service_Type: obj.OVERNIGHT_SERVICE_TYPE || '',
      program_Model: obj.PROGRAM_MODEL || '',
      service_User_Count: parseInt(obj.SERVICE_USER_COUNT) || 0,
      capacity_Actual_Room: parseInt(obj.CAPACITY_ACTUAL_ROOM) || 0,
    }));

    return transformedObjects;
  } catch (error) {
    console.error(`Error reading file ${filename}: ${error.message}`);
  }
}

// Define the GET endpoint to fetch metrics
app.get('/api/metrics', async (req, res) => {
  try {
    // Retrieve metrics from MongoDB
    const metrics = await Metrics.find();
    res.json(metrics);
  } catch (error) {
    console.error('Error fetching metrics:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
