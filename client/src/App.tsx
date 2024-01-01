// import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/layout/Nav';
import Landing from './pages/Landing';
// import Home from './pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={
            // <Home
            //   user={user}
            //   setUser={setUser}
            //   coordinates={coordinates}
            //   setCoordinates={setCoordinates}
            // />
            <Landing /> 
            } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
