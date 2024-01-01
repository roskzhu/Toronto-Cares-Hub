import React from "react";
import Organization from './Organizations'; 
import '../styles/OrgContainer.css';

type OrganizationContainerProps = {
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
};

const organizations = [
  { id: 1, name: 'Organization 1' },
];

// Converted to a functional component
const OrganizationContainer: React.FC<OrganizationContainerProps> = ({ setCoordinates }) => {
  return (
    <div className="org-container bg-black text-white">
      <h2 className="text-blue-400 font-bold">DESTINATIONS</h2>
      {organizations.map((org) => (
        <Organization key={org.id} setCoordinates={setCoordinates}/>
      ))}
    </div>
  );
};

export default OrganizationContainer;
