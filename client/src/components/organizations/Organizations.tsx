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

/* eslint-disable */
const OrganizationsWidget: React.FC<OrganizationsWidget> = ({ setCoordinates }) => {
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  useEffect(() => {
    // Fetch data from your API endpoint
    const fetchData = async () => {
      try {
        const response = await axios.get<Organization[]>('http://localhost:5000/api/organizations');
        setOrganizations(response.data);
      } catch (error: any) {
        console.error('Error fetching data:', error.message);
      }
    };

    fetchData();
  }, []);

  // Function to capitalize the first character after each comma
  const capitalizeAfterComma = (str: string) => {
    return str.replace(/,(\s*[a-z])/g, (_, match) => `, ${match.toUpperCase()}`)
              .replace(/(?:^|\s)([a-z])/g, (_, match) => ` ${match.toUpperCase()}`);
  };

  // Function to set the selected location on the map
  const handleSetLocation = (lat: number, lng: number) => {
    setCoordinates({ lat: lat, lng: lng } );
    console.log("coordinates org changed", lat, lng);
  };

  return (
    <div className="text-sm">
      <ul>
        {organizations.map((org) => (
          <button key={org._id} 
                  className="bg-white/10 mb-2 p-2 hover:bg-white/20 text-left"
                  onClick={() => handleSetLocation(org.lat, org.lng)}>
                  
            {Object.entries(org).map(([key, value], index, array) => (
              // Skip the first(_id) and last(__v) entries
              index !== 0 && index < array.length - 3 && (
                <React.Fragment key={key}>
                  <span className="text-blue-400 uppercase">
                   {key.replace(/_/g, ' ')}:
                  </span> {" "}
                  
                  {capitalizeAfterComma(value)} <br />
                </React.Fragment>
              )
            ))}
          </button>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationsWidget;
