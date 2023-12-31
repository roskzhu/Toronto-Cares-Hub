import React, { useState, useEffect, ChangeEvent } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { InstantSearch, connectSearchBox, InfiniteHits } from 'react-instantsearch-dom';
import '../styles/Map.css';
import algoliasearch from 'algoliasearch/lite';
import Geocode from "react-geocode";
import PropTypes from "prop-types";

// map constants
interface Location {
  lat: number;
  lng: number;
}

interface Organization {
  objectID: string;
  name: string;
  address: string;
  hours: string;
  clientGroup: string;
  lat: number; // Add lat and lng to the Organization interface
  lng: number;
}

interface MapComponentProps {
  organizations: Organization[]; // Replace with your data structure
}

// search box constants
const searchClient = algoliasearch('AU3O59CQBC', 'ea3d508d33ab097406ca457d7741a0cf');

interface SearchBoxProps {
  currentRefinement: string;
  isSearchStalled: boolean;
  refine: (value: string) => void;
}

const SearchBox: React.FC<SearchBoxProps> = ({ currentRefinement, isSearchStalled, refine }) => (
  <form noValidate action="" role="search">
    <input
      className="searchBox"
      placeholder="Search for a shelter..."
      type="search"
      value={currentRefinement}
      onChange={(event: ChangeEvent<HTMLInputElement>) => refine(event.currentTarget.value)}
    />
    <button className="resetQuery" onClick={() => refine("")}>
      Reset query
    </button>
    {isSearchStalled ? "My search is stalled" : ""}
  </form>
);

const CustomSearchBox = connectSearchBox(SearchBox);

// Geocode.setApiKey('YOUR_GOOGLE_GEOCODING_API_KEY'); // Replace with your API key

// Geocode.setLanguage("en");

// Geocode.setLocationType("ROOFTOP");

// Geocode.enableDebug();

const MapComponent: React.FC<MapComponentProps> = ({ organizations }) => {
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  const [items, setItems] = useState([]);
  const [address, setAddress] = useState("Please select a location");
  const [shelterName, setShelterName] = useState("");
  const [link, setLink] = useState("");
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/comments"
      );
      const data = await response.json();
      setItems(data);
    };
    fetchData();
    console.log(items);
  }, []);

  const changeLocationHeader = (address: string, shelterName: string, link: string) => {
    Geocode.fromAddress(address).then((response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setLat(lat);
      setLng(lng);
      setAddress(address);
      setShelterName(shelterName);
      setLink(link);
    });
    console.log(link);
    console.log(lat, lng);
    console.log(address);
  };

  function Hit(props: { hit: any }) {
    return (
      <div className="infoCardContainer" id="like-scroll">
        {/* <InfoCard
          key={props.hit.objectID}
          shelterName={props.hit.FACILITY_NAME}
          shelterType={props.hit.SECTOR}
          shelterOccupancy={props.hit.OCCUPANCY}
          shelterCapacity={props.hit.CAPACITY}
          onClick={() => changeLocationHeader(props.hit.SHELTER_ADDRESS, props.hit.FACILITY_NAME, props.hit.URL)}
        /> */}
      </div>
    );
  }

  Hit.propTypes = {
    hit: PropTypes.object.isRequired,
  };

  const mapContainerStyle: React.CSSProperties = {
    width: '80%',
    height: '60vh',
  };

  const center: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 };

  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    console.error('Google Maps API key is not defined. Set REACT_APP_GOOGLE_MAPS_API_KEY in your environment.');
    return null;
  }

  return (
    <div className="map-container">
      <InstantSearch 
          searchClient={searchClient} 
          indexName="instant_search">
        <CustomSearchBox/>
          <div className="infoCardContainer" id="like-scroll">
            <InfiniteHits hitComponent={Hit} />
          </div>

          <LoadScript googleMapsApiKey={apiKey}>
            <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
              {organizations
                .filter((organization) =>
                  organization.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
                .map((organization, index) => (
                  <Marker key={index} position={{ lat: organization.lat, lng: organization.lng }} />
                ))}
            </GoogleMap>
          </LoadScript>
        {/* </CustomSearchBox> */}
      </InstantSearch>
    </div>
  );
};

export default MapComponent;
