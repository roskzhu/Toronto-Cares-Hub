<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px">Homeless Shelter Navigation</h1></summary>
      </ul>
    </div>
    <h3>Navigating Compassion: Mapping Toronto's Shelters for a Sheltered Tomorrow</h3>
<!--     <h4><i>xxx</i></h4> -->
       <br>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<!--     <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/redux-%23316192.svg?style=for-the-badge&logo=redux&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/> -->
    <br><br>
</div>

![image](https://github.com/roskzhu/Toronto-Shelter-Metrics-Map/assets/110139243/c1afc1ab-6dd8-4c86-8196-64de422ce22a)


This web application aims to assist individuals in need by providing an interactive map interface to navigate to the nearest food banks and shelters in Toronto. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js), our app offers an immersive and user-friendly experience for locating essential services.


## Features
### 1. Interactive 3D Map
Utilize a visually engaging 3D map to explore shelter and food bank locations.   
### 2. Real-Time Data
Access up-to-date information on shelter capacities, services provided, and food bank availability.
### 3. Route Planning
Enable users to plan and visualize the most efficient route to their nearest food bank or shelter.


## Prerequisites
Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

## Architecture Overview
to be added
- metrics are from city of toronto api
- shelter information is scraped from city of toronto shelters page, then stored in a mongo db
- google maps api for map visualization (carousel), locations are searched with algolia
- redis for statemanagement
- docker/firebase?

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

![image](https://github.com/roskzhu/Toronto-Shelter-Metrics-Map/assets/110139243/f058e10a-87c5-4bdc-a258-7f6d9fbd8002)
![image](https://github.com/roskzhu/Toronto-Shelter-Metrics-Map/assets/110139243/0090a1f8-4c2c-4e01-b78a-5ab5e0194d54)
