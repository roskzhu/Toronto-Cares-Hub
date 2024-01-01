import { useEffect, useState } from "react";
import Map from "../components/GoogleMap";
import Searchbar from "../components/SearchBar";
import OrgContainer from '../components/OrganizationContainer';

interface HomeProps {
  coordinates: { lat: number; lng: number };
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
}

const Home: React.FC<HomeProps> = ({ coordinates, setCoordinates }) => {
  const [place, setPlace] = useState<any>(null); // Replace 'any' with the actual type of your place
  const [places, setPlaces] = useState<any[]>([]); // Replace 'any' with the actual type
  const [curPlaces, setCurPlaces] = useState<any[]>([]); // Replace 'any' with the actual type
  const [bounds, setBounds] = useState<any>(null); // Replace 'any' with the actual type
  const [pinHover, setPinHover] = useState<number>(-1);
  const [searchQuery, setSearchQuery] = useState<any>(null); // Replace 'any' with the actual type
  const [lat, setLat] = useState<number>(0);
  const [lng, setLng] = useState<number>(0);

  useEffect(() => {
    setCurPlaces(
      places.filter(
        (place) =>
          place.latitude >= bounds.sw.lat &&
          place.latitude <= bounds.ne.lat &&
          place.longitude >= bounds.sw.lng &&
          place.longitude <= bounds.ne.lng
      )
    );
  }, [bounds, places]);

  return (
    <div className="flex flex-col flex-1 overflow-y-auto">
      <form className="flex justify-center pt-10">
        <div className="flex w-6/12">
          <Searchbar
            onLoad={(autoC) => setSearchQuery(autoC)}
            onPlaceChanged={() => {
              setLat(searchQuery?.getPlace()?.geometry?.location?.lat() ?? 0);
              setLng(searchQuery?.getPlace()?.geometry?.location?.lng() ?? 0);
            }}
            handleSearch={(e) => {
              e.preventDefault();
              setCoordinates({ lat, lng });
            }}
            shouldShowButton={true}
          />
        </div>
      </form>

      <div className="flex flex-row align-center pt-8 z-0 flex-1 overflow-y-auto">
        <OrgContainer
          setCoordinates={setCoordinates}
        />
        <div className="justify-end flex w-full">
          <Map
            places={places}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            setBounds={setBounds}
            setPlace={setPlace}
            pinHover={pinHover}
            setPinHover={setPinHover}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
