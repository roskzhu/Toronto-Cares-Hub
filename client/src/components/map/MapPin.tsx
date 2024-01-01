import React from "react";
import pin from "./pin.png";

interface MapPinProps {
  id: number;
  place: {
    name: string;
    location: string;
    rating: number;
  };
  lat: number;
  lng: number;
  pinHover: number;
}

const MapPin: React.FC<MapPinProps> = ({ id, place, pinHover }) => {
  const { name, location, rating } = place;

  const getPin = () => {
    return pin;
  };

  return (
    <>
      <div
        id={"tooltip-animation-" + id}
        role="tooltip"
        className="absolute z-10 inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-black rounded-lg shadow-sm opacity-0 tooltip w-40"
      >
        <p className="font-bold leading-tight line-clamp-2">{name}</p>
        <p className="text-xs line-clamp-4">{location}</p>

        <div className="tooltip-arrow" data-popper-arrow></div>
      </div>
      <img
        src={getPin()}
        className={
          "absolute " +
          (pinHover === id
            ? "-left-6 -top-12 h-20 w-12"
            : "-left-5 -top-8 h-16 w-10") +
          " transition-all cursor-pointer"
        }
        data-tooltip-target={"tooltip-animation-" + id}
        alt="Map Pin"
      />
    </>
  );
};

export default MapPin;
