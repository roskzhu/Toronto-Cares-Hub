import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <hr className="flex-grow border-t border-white/30 w-[97%] mx-auto mt-20"/>
      <footer className="text-white/80 flex justify-between mt-4 mx-6 mb-4">
        <p className="uppercase">
          Toronto Homeless Shelter Metrics Map
        </p>
        <p>Developed and designed by {' '} 
          <span className="hover:underline">
            <a href="https://rosannezhu.com">
              Rosanne
            </a>
          </span>.
        </p>
      </footer>
    </>
  );
};

export default Footer;
