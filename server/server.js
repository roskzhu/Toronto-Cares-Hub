const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 5000;

const https = require('https');

// Algolia configuration
const algoliaClient = algoliasearch('YOUR_ALGOLIA_APP_ID', 'YOUR_ALGOLIA_API_KEY');
const algoliaIndex = algoliaClient.initIndex('your_algolia_index_name');


// MongoDB connection
mongoose.connect('mongodb://localhost:27017/scrapedData', {
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
  clientGroup: String,
});

// Define the DELETE endpoint to delete the entire database
app.delete('/api/deleteDatabase', async (req, res) => {
  try {
    // Delete all documents in the Organization collection
    await Organization.deleteMany({});
    
    // If you want to delete the entire database, uncomment the line below
    // await mongoose.connection.db.dropDatabase();

    console.log('Database deleted successfully');
    res.json({ message: 'Database deleted successfully' });
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

// Scraping route
app.get('/api/scrape', async (req, res) => {
  try {
    // Replace the URL with the actual URL you want to scrape
    const response = await axios.get('https://www.toronto.ca/community-people/housing-shelter/homeless-help/housing-help/');
    const $ = cheerio.load(response.data);

    // Extract information based on your HTML structure
    const organizations = [];

    // Example: Extracting organization information
    $('tr[data-lat][data-lng]').each((index, element) => {
      const organizationName = $(element).find('td:first-child').text().trim();
      const organizationDetails = $(element).find('td:nth-child(2)').text().trim();
      console.log(organizationDetails);

      const detailsArray = organizationDetails.split('\n').map(line => line.trim());

      organizations.push({
        name: organizationName,
        details: organizationDetails,
        address: detailsArray.find(line => line.startsWith('Address:')),
        hours: detailsArray.find(line => line.startsWith('Hours:')),
        clientGroup: detailsArray.find(line => line.startsWith('Client Group:')),
      });
    });
    

    // Save the extracted data to MongoDB
    const savedData = await Organization.insertMany(organizations);

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

// Algolia endpoints

// Define a method to sync MongoDB address data with Algolia
const syncDataWithAlgolia = async () => {
  try {
    // Retrieve data from MongoDB
    const organizations = await Organization.find();

    // Prepare data for Algolia
    const algoliaObjects = organizations.map(org => ({
      objectID: org._id.toString(), // Use a unique identifier
      name: org.name,
      address: org.address,
      hours: org.hours,
      clientGroup: org.clientGroup,
    }));

    // Save data to Algolia
    await algoliaIndex.saveObjects(algoliaObjects);

    console.log('Sync successful!');
  } catch (error) {
    console.error('Error syncing data with Algolia:', error.message);
  }
};

// Route to trigger syncing
app.post('/api/syncAlgolia', async (req, res) => {
  try {
    await syncDataWithAlgolia();
    res.json({ message: 'Sync successful!' });
  } catch (error) {
    console.error('Error syncing data with Algolia:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
