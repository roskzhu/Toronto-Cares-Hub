import React from "react";
import Organization from './Organizations'; 
import '../../styles/OrgContainer.css';

type OrganizationContainerProps = {
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: number; lng: number }>>;
};

const organizations = [
  { id: 1, name: 'Organization 1' },
];

// Converted to a functional component
const OrganizationContainer: React.FC<OrganizationContainerProps> = ({ setCoordinates }) => {
  return (
    <div className="absolute w-1/4 h-[500px]
                   bg-black text-white mx-8">
      <div className=" mb-4 ml-1">
        <h2 className="text-white/70 tracking-widest mb-1 font-medium">
          SHELTER DESTINATIONS
        </h2>
        <p className="text-white/60 text-sm tracking-wider">
          Click to see location details
        </p>
      </div>
      <div className="absolute h-[435px] overflow-hidden overflow-y-auto ">
        {organizations.map((org) => (
          <Organization key={org.id} setCoordinates={setCoordinates}/>
        ))}
      </div>
    </div>
  );
};

export default OrganizationContainer;
