import React from 'react';

interface CardProps {
  card: {
    title: string;
    content: string;
    image: string;
    year: string;
    tech: Array<string>;
    github: string;
  };
}

const CarouselCard: React.FC<CardProps> = ({ card }) => {
  return (
    <a href={card.github} target="_blank" rel="noopener noreferrer">

    <div className="h-400px mx-2 w-200px grid place-items-center font-rubik font-semibold 
                    relative bg-white/10 hover:bg-white/20 hover:backdrop-blur bg-cover bg-center 
                    pb-5 text-left justify-start max-w-screen-xl overflow-hidden
                    "
                    // style={{ backdropFilter: 'blur(10px)' }}
                    >
      <img src={card.image} alt="" className="mt-[10px] max-w-95 " style={{ maxWidth: "95%" }}/>
      {/* <img src={card.image} alt="" className="mt-[-120px] absolute max-w-50 hover:scale-105" style={{ maxWidth: "85%" }}/> */}
      <div className="place-items-start w-full ml-10 mt-4">
        <div className="flex">
          <p className="text-white/90 font-light text-base border border-white/90 rounded-full p-1 px-4 mr-2">
            {card.year}
          </p>
          <p className="text-white/90 font-light md:text-base text-sm border border-white/90 rounded-full p-1 px-4">
            {card.tech.join(' • ')}
            {/* {card.tech.join(' ∙ ')} */}
          </p>
        </div>
        
        <p className="text-white font-semibold text-2xl uppercase mt-3">{card.title}</p>
        <p className="text-white font-light text-sm text-left mt-1">{card.content}</p>
      </div>
    </div>
    </a>
  );
};

export default CarouselCard;
