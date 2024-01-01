import React , { useEffect, useState } from 'react';
import '../styles/Landing.css';
// import Wrapper from './Wrapper';
import Home from './Home';

const TORONTO_COORDS = {
  lat: 43.66583121158871,
  lng: -79.38509373244385,
};

const Landing: React.FC = () => {
  const [lat, setLat] = useState(0);
  const [lng, setLng] = useState(0);
  const [place, setPlace] = useState(null);
  const [searchQuery, setSearchQuery] = useState(null);
  const onLoad = (autoC : any) => setSearchQuery(autoC);

  const onPlaceChanged = () => {
    // setLat(searchQuery?.getPlace()?.geometry?.location?.lat() ?? 0);
    // setLng(searchQuery?.getPlace()?.geometry?.location?.lng() ?? 0);
  };

  const [coordinates, setCoordinates] = useState(TORONTO_COORDS);

  return (
    <div className="bg-black/90">
      {/* <h1>Welcome to the Landing Page</h1> */}
      <p className="text-white">In an emergency, dial 911 immediately.</p>

      {/* <Search
            onLoad={onLoad}
            onPlaceChanged={onPlaceChanged}
            handleSearch={handleSearch}
            shouldShowButton={true}
          /> */}
          <Home
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            />
          {/* <Wrapper
            coordinates={coordinates}
            setCoordinates={setCoordinates}
          /> */}

      {/* <OrgContainer/> */}
      {/* Pass locations prop to Map component */}
      {/* <Map locations={locations} /> */}
      {/* <Carousel></Carousel> */}
    </div>
  );
};

export default Landing;
