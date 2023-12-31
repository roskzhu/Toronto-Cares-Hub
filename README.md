<div align="center">
    <div id="user-content-toc">
      <ul>
          <summary><h1 style="display: inline-block; margin-bottom:0px">Homeless Shelter Navigation</h1></summary>
      </ul>
    </div>
    <h3></h3>
<!--     <h4><i>xxx</i></h4> -->
       <br>
    <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white"/>
    <img src="https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white"/>
    <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white"/>
<!--     <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/redux-%23316192.svg?style=for-the-badge&logo=redux&logoColor=white"/> -->
    <!-- <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white"/> -->
    <br><br>
</div>

This web application aims to assist individuals in need by providing a 3D map interface to navigate to the nearest food banks and shelters in Toronto. Leveraging the MERN stack (MongoDB, Express.js, React, Node.js), our app offers an immersive and user-friendly experience for locating essential services.


## Features
### 1. Interactive 3D Map
Utilize a visually engaging 3D map to explore shelter and food bank locations.   
### 2. Real-Time Data
Access up-to-date information on shelter capacities, services provided, and food bank availability.
### 3. Route Planning
Enable users to plan and visualize the most efficient route to their nearest food bank or shelter.


## Prerequisites
Before you begin, ensure you have met the following requirements:

- [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed for the frontend.
- [Python](https://www.python.org/) and [pip](https://pip.pypa.io/en/stable/) installed for the backend.

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

