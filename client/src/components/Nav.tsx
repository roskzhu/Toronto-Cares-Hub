import React from 'react';
import '../styles/Nav.css';

const Nav: React.FC = () => {
  return (
    <nav>
      <ul className="navbar">
        <li>TORONTO</li>
        <li>About</li>
        <li>Contact</li>
      </ul>
    </nav>
  );
};

export default Nav;
