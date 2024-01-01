import React, { useRef } from 'react';
import Swiper from 'react-slick';
import './carousel.module.css';
import CarouselCard from './info-card';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
// import Container from "../../container";
import { Settings } from 'react-slick';

const Carousel: React.FC = () => {
  const settings: Settings = {
    infinite: true,
    speed: 300,
    slidesToScroll: 1,
    autoplay: true,
    pauseOnHover: true,
    className: 'test',
    centerMode: false,
    slidesToShow: 3,

    responsive: [
      {
        breakpoint: 1024, // md and above
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, // sm
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const slider = useRef<Swiper>(null);

  return (
    <>
    <div className="flex flex-col mt-[40px]"> 
    {/* <CarouselContainer> */}
      <Swiper ref={slider} {...settings}>
        {cards.map((card, index) => (
          <CarouselCard card={card} key={index} />
        ))}
      </Swiper>

      <div className="flex justify-center mt-4">
        <button className="carousel-control" onClick={() => slider.current?.slickPrev()}>
          <IoIosArrowBack style={{color:'white', marginRight:'25px'}}/>  
        </button>
        <button className="carousel-control" onClick={() => slider.current?.slickNext()}>
          <IoIosArrowForward style={{color:'white'}}/>
        </button>
      </div>
    </div>
    {/* </CarouselContainer> */}
    </>
  );
};

interface Card {
  title: string;
  content: string;
  image: string;
  year: string;
  tech: Array<string>;
  github: string;
}

const cards: Card[] = [
  {
    title: 'Toronto Shelter Map',
    content: 'Metrics and visualization for Toronto\'s homeless shelters.',
    image: '/assets/projects/map.png',
    year: '2023',
    tech: ['MongoDB', 'Express', 'React', 'Node.js'],
    github: 'https://github.com/roskzhu/Toronto-Shelter-Metrics-Map',
  },
  {
    title: 'CareCompanion',
    content: 'Caregiver support app for the elderly.',
    image: '/assets/projects/carecompanion.png',
    year: '2023',
    tech: ['Golang', 'PostgreSQL', 'Next.js'],
    github: 'https://github.com/roskzhu/CareCompanion',
  },  
  {
    title: 'Collaboracart',
    content: 'Supply ordering app to help small businesses cut costs.',
    image: '/assets/projects/collaboracart.png',
    year: '2023',
    tech: ['SQLite', 'Flask', 'React', 'TailwindCSS'],
    github: 'https://github.com/roskzhu/CollaboraCart',
  },
  {
    title: 'FridgeSmart',
    content: 'Computer vision recipe making AI.',
    image: '/assets/projects/fridgesmart.png',
    year: '2023',
    tech: ['React', 'Javascript'],
    github: 'https://github.com/roskzhu/FridgeSmart',
  },
  {
    title: 'Tetris',
    content: 'Multiplayer Tetris Variation.',
    image: '/assets/projects/tetris.png',
    year: '2023',
    tech: ['C++'],
    github: 'https://github.com/roskzhu/Biquadris',
  },
  {
    title: 'RAGbit Hole',
    content: 'Rabbit-holing chatbot assistant.',
    image: '/assets/projects/rag.png',
    year: '2023',
    tech: ['Flask', 'React', 'Google Cloud'],
    github: 'https://github.com/roskzhu/RAGbit-Hole',
  },
  {
    title: 'iSpy',
    content: 'Facial recognition security system.',
    image: '/assets/projects/ispy.png',
    year: '2023',
    tech: ['PostgreSQL', 'Flask', 'React'],
    github: 'https://github.com/roskzhu/iSpy-V2',
  },
];

export default Carousel;
