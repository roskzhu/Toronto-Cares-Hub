// MapComponent.tsx
import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import algoliasearch from "algoliasearch/lite";
// import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import {
  InstantSearch,
  SearchBox, 
  Hits,
  InfiniteHits,
  Pagination,
  Highlight,
  ClearRefinements,
  RefinementList,
  Configure,
  connectSearchBox,
} from "react-instantsearch-dom";
import '../styles/Map.css';

interface Location {
  lat: number;
  lng: number;
}

interface MapComponentProps {
  locations: Location[];
}

const searchClient = algoliasearch(
  "YOUR_ALGOLIA_APP_ID",
  "YOUR_ALGOLIA_API_KEY"
);

const MapComponent: React.FC<MapComponentProps> = ({ locations }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Temporary locations for testing
  const temporaryLocations: Location[] = [
    { lat: 37.785, lng: -122.4064 },
    { lat: 37.777, lng: -122.3994 },
    // Add more temporary locations as needed
  ];

  const mapContainerStyle: React.CSSProperties = {
    width: '80%',
    height: '60vh',
  };

  const center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // Set the initial center of the map

  // Check if the environment variable is defined
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  console.log('API Key:', apiKey);  // for debugging 

  if (!apiKey) {
    console.error('Google Maps API key is not defined. Set REACT_APP_GOOGLE_MAPS_API_KEY in your environment.');
    return null; // or render an error message
  }

  return (
    <div className="map-container">
      <InstantSearch
        appId="YOUR_ALGOLIA_APP_ID"
        apiKey="YOUR_ALGOLIA_API_KEY"
        indexName="your_algolia_index_name"
      >
        <SearchBox
          translations={{ placeholder: 'Search for organizations...' }}
          onChange={(event) => setSearchQuery(event.currentTarget.value)}
        />
        <Hits hitComponent={({ hit }) => <Marker position={{ lat: hit.lat, lng: hit.lng }} />} />


      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
          {/* Display provided locations */}
          {locations.map((location, index) => (
            <Marker key={index} position={location} />
          ))}

          {/* Display temporary locations for testing */}
          {temporaryLocations.map((location, index) => (
            <Marker key={`temp-${index}`} position={location} label={`Temp ${index + 1}`} />
          ))}
        </GoogleMap>
      </LoadScript>

      </InstantSearch>
    </div>
  );
};

export default MapComponent;