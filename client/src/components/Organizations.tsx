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
    <div className="">
      <ul>
        {organizations.map((org) => (
          <li key={org._id}>
                       
            <button className="border-2 rounded-md bg-slate-900" 
                    onClick={() => handleSetLocation(org.lat, org.lng)}>
              See Location
            </button> 
            <br/>
            
            
            {Object.entries(org).map(([key, value], index, array) => (
              // Skip the first(_id) and last(__v) entries
              index !== 0 && index !== array.length - 1 && (
                <React.Fragment key={key}>
                  <strong className="uppercase">
                    {key.charAt(0).toUpperCase() + key.slice(1)}:
                  </strong> {" "}
                  
                  {value} <br />
                </React.Fragment>
              )
            ))}
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationsWidget;
