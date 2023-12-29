import React from 'react';
import '../styles/Nav.css';

const Nav: React.FC = () => {
  return (
    <nav id="nav">
      <ul className="navbar">
        <li>TORONTO <br/> HOMELESS SHELTER METRICS</li>
        {/* <li>About</li>
        <li>Contact</li> */}
      </ul>
    </nav>
  );
};

export default Nav;
