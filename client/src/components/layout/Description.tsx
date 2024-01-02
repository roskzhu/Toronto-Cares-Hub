import React from 'react';

const Description: React.FC = () => {
  return (
    <div className="w-[62%] mx-auto mt-40 mb-20">
      <h1 className="text-white text-4xl font-bold leading-relaxed">
        Connecting you to Toronto's shelters effortlessly. 
        Seamlessly navigate through shelter locations, providing a beacon of hope for those in need. 
        Your gateway to {" "}
        <span className="bg-gradient-to-r from-blue-500 to-green-500 text-transparent bg-clip-text text-fill-transparent">
          compassionate support 
        </span> 
        {" "}
        and 
        {" "}
        <span className="bg-gradient-to-r from-yellow-400 to-orange-400 text-transparent bg-clip-text text-fill-transparent">
          community empowerment.
        </span>
      </h1>
    </div>
  );
};

export default Description;
