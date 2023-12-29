import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Organization {
  _id: string;
  name: string;
  address: string;
  hours: string;
  clientGroup: string;
}

const OrganizationsWidget: React.FC = () => {
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

  return (
    <div>
      <ul>
        {organizations.map((org) => (
          <li key={org._id}>
            <strong>Name:</strong> {org.name} <br />
            <strong>Address:</strong> {org.address} <br />
            <strong>Hours:</strong> {org.hours} <br />
            <strong>Client Group:</strong> {org.clientGroup} <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrganizationsWidget;
