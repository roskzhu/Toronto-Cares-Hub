import React from 'react';
import '../styles/Landing.css';
import Map from '../components/Map';
import Organizations from '../components/Organizations';
import OrgContainer from '../components/OrganizationContainer';

const Landing: React.FC = () => {
  // Example locations for testing
  const locations = [
    { lat: 37.7749, lng: -122.4194 },
    { lat: 37.785, lng: -122.4064 },
    // Add more locations as needed
  ];

  const organizations = [
    { 
      objectID: "string",
      name: "string",
      address: "string",
      hours: "string",
      clientGroup: "string",
      lat: 37.7749, // Add lat and lng to the Organization interface
      lng: -122.4194,
    },
    // Add more locations as needed
  ];

  return (
    <div className="landing-container">
      {/* <h1>Welcome to the Landing Page</h1> */}
      <p>In an emergency, dial 911 immediately.</p>
      <OrgContainer/>
      {/* Pass locations prop to Map component */}
      <Map organizations={organizations} />
      {/* <Carousel></Carousel> */}
    </div>
  );
};

export default Landing;
