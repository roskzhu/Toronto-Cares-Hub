import React from 'react';
import '../../styles/Nav.css';

const Nav: React.FC = () => {
  return (
    <nav className="bg-black flex text-white justify-between 
                  p-4 px-6 top-0 font-normal fixed w-full z-50">
      <p>
        Toronto Cares Hub
      </p>
      <p>
        <a href="https://github.com/roskzhu/Toronto-Shelter-Metrics-Map"
          className="hover:bg-white/20 p-2 rounded-md">
        GitHub Repo
        </a>
      </p>
    </nav>
  );
};

export default Nav;
