// import React from 'react';
import logo from './logo.svg';
import './App.css';
import Nav from './components/Nav';
import Landing from './pages/Landing';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
