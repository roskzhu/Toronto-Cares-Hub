<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px">Toronto Cares Hub</h1></summary>
      </ul>
    </div>
    <h3>Navigating Compassion: Mapping Toronto's Shelters for a Sheltered Tomorrow</h3>
<!--     <h4><i>xxx</i></h4> -->
       <br>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/>
    <!-- <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/redux-%23316192.svg?style=for-the-badge&logo=redux&logoColor=white"/> -->
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/>
    <br><br>
</div>

![image](https://github.com/roskzhu/Toronto-Shelter-Metrics-Map/assets/110139243/c1afc1ab-6dd8-4c86-8196-64de422ce22a)


This web application aims to assist individuals in need by providing an interactive map interface to navigate to the nearest food banks and shelters in Toronto. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js), our app offers an immersive and user-friendly experience for locating essential services.


## Features
- Route Planning: Enable users to plan and visualize the most efficient route to their nearest food bank or shelter.
- Interactive Shelter Navigation: Effortlessly navigate through Toronto's shelter locations with an intuitive map interface. Find detailed information about each shelter, including occupancy rates, services offered, and more.
- Real-time Metrics Updates: Stay informed with real-time updates on shelter metrics. Our application provides the latest data on occupancy rates, program models, and other vital information to keep you well-informed.
- Comprehensive Shelter Details: Access detailed information about each shelter, including organization names, addresses, hours of operation, and client group details. Make informed decisions with a comprehensive overview of each location.

## Prerequisites
Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## Architecture Overview
to be added
- metrics are from city of toronto api
- shelter information is scraped from city of toronto shelters page, then stored in a mongo db
- google maps api for map visualization (carousel), locations are searched with algolia
- redis for statemanagement

## Getting Started

### Starting the server

_(127.0.0.1:5000 by default)_

1. `cd server`
2. `node server.js`

### Starting the app

_(localhost:3000 by default)_

1. `cd client`
2. `npm install`
3. `npm start`

### Sneak Peak
![image](https://github.com/roskzhu/Toronto-Cares-Hub/assets/110139243/74998b2f-4199-4a6a-8bb9-1f9a56a39188)
![image](https://github.com/roskzhu/Toronto-Cares-Hub/assets/110139243/d1f20aa5-2477-44ac-ba5b-d419e2b6fad4)

## Next Steps
- [X] Add metrics from City of Toronto API in a carousel
- [X] Use Google Maps API for map visualization and searching
- [X] Set up MongoDB keys for geocoding
- [ ] Deploy with docker
- [ ] Add more info (i.e. emergency services, food banks)
- [ ] Leverage Redis for caching
