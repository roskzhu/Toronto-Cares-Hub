import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Organization {
  _id: string;
  name: string;
  address: string;
  hours: string;
  clientGroup: string;
  lat: number;
  lng: number;  
}

type OrganizationsWidget = {
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
};

const OrganizationsWidget: React.FC<OrganizationsWidget> = ({ setCoordinates }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get<Organization[]>('http://localhost:5000/api/organizations'); // Replace with your API endpoint
        setOrganizations(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Function to set the selected location on the map
  const handleSetLocation = (lat: number, lng: number) => {
    setCoordinates({ lat: lat, lng: lng } );
    console.log("coordinates org changed", lat, lng);
  };

  return (
    <div className="text-sm">
      <ul>
        {organizations.map((org) => (
          <li key={org._id} className="bg-white/10 mb-2 p-2 hover:bg-white/20">
                       
            
            {Object.entries(org).map(([key, value], index, array) => (
              // Skip the first(_id) and last(__v) entries
              index !== 0 && index < array.length - 3 && (
                <React.Fragment key={key}>
                  <span className="uppercase text-blue-400">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </span> {" "}
                  
                  {value} <br />
                </React.Fragment>
              )
            ))}
            
            <button className="border p-1 mt-2 rounded-md hover:bg-white/15 px-3" 
              onClick={() => handleSetLocation(org.lat, org.lng)}>
              See Location
            </button> 
            <br/>

          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationsWidget;
