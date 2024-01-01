import React from "react";
import GoogleMapReact from "google-map-react";
import MapPin from "./MapPin";

interface MapProps {
  places: any[]; 
  coordinates: { lat: number; lng: number };
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
  setBounds: React.Dispatch<
    React.SetStateAction<{
      ne: { lat: number; lng: number };
      sw: { lat: number; lng: number };
    }>
  >;
  setPlace: React.Dispatch<React.SetStateAction<any>>; 
  pinHover: number;
  setPinHover: React.Dispatch<React.SetStateAction<number>>;
}

const Map: React.FC<MapProps> = ({
  places,
  coordinates,
  setCoordinates,
  setBounds,
  setPlace,
  pinHover,
  setPinHover,
}) => {
  const handleMapChange = (e: any) => {
    setCoordinates({ lat: e.center.lat, lng: e.center.lng });
    setBounds({ ne: e.marginBounds.ne, sw: e.marginBounds.sw });
    console.log("coordinates changed", e.center.lat, e.center.lng);
  };

  const handleChildClick = (_: any, childProps: { place: any }) => {
    setPlace(childProps.place);
  };

  const handleChildMouseEnter = (_: any, childProps: { id: number }) => {
    setPinHover(childProps.id);
  };

  const handleChildMouseLeave = () => {
    setPinHover(-1);
  };

  return (
    <div className="w-[68%] overflow-hidden h-[500px] justify-end flex mx-6">
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string }}
        yesIWantToUseGoogleMapApiInternals
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        options={{
          clickableIcons: false,
          styles: [
            {
              elementType: "all",
              stylers: [
                { saturation: -60 },
                { lightness: -50 },
                { invert_lightness: true },
                { gamma: 0.3 },
              ],
            },
          ],
        }}
        onChange={(e) => handleMapChange(e)}
        onChildClick={handleChildClick}
        onChildMouseEnter={handleChildMouseEnter}
        onChildMouseLeave={handleChildMouseLeave}
      >
        {places?.map((place, ind) => (
          <MapPin
            key={ind}
            id={place.id}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
            place={place}
            pinHover={pinHover}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
