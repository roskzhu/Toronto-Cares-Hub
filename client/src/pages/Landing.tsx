import React , { useState } from 'react';
import '../styles/Landing.css';
import Home from './MapContainer';

const TORONTO_COORDS = {
  lat: 43.66583121158871,
  lng: -79.38509373244385,
};

const Landing: React.FC = () => {
  const [coordinates, setCoordinates] = useState(TORONTO_COORDS);

  return (
    <div className="bg-black w-full">
    <div className="">
      <h1 className="text-white text-4xl text-left font-semibold pt-[120px] w-[700px] mx-auto leading-relaxed">
        Mapping sheltered havens for the <br/>
        <span className="ml-6"> homeless community with {" "}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-fill-transparent">
          compassion
        </span>
        . </span> <br/>
        Navigate with purpose below.
      </h1>
      <div className="flex mx-auto w-[700px] mt-1">
      <hr className="flex-grow border-t border-white/30 w-[100%] mx-auto mt-7"/>

        <p className="text-white/70 mx-auto text-left ml-8 w-[700px] mt-4 mb-10 tracking-wider font-thin">
          In an emergency, dial 911 immediately.
          </p>

      </div>
      
        <img src="imgs/toronto.png" alt="Background Image" 
            className="opacity-70 w-2/3 justify-center mx-auto rounded-xl">
        </img>


    </div>
    <div className="w-[100%] mx-auto">
      <Home
        coordinates={coordinates}
        setCoordinates={setCoordinates}
      />
      </div>
    </div>
  );
};

export default Landing;
