import React from 'react';
import '../styles/Nav.css';

const Nav: React.FC = () => {
  return (
    <nav id="nav">
      <ul className="navbar">
        <li>
          <span className="text-blue-400 text-3xl">
            TORONTO 
          </span>
          <br/> 
          <span className="tracking-widest text-sm">
            HOMELESS SHELTER METRICS
          </span>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
