import React from 'react';
import Organization from './Organizations'; 
import '../styles/OrgContainer.css';

const organizations = [
  { id: 1, name: 'Organization 1' },
];

class OrganizationContainer extends React.Component {
  render() {
    return (
      <div className="org-container">
        <h2>DESTINATIONS</h2>
        {organizations.map((org) => (
          <Organization key={org.id}/>
        ))}
      </div>
    );
  }
}

export default OrganizationContainer;
