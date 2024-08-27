// src/App.js
import React from 'react';
import CVUploadingPage from './components/CVUploadingPage';
import { Route, Routes } from 'react-router-dom';
import ProjectDescriptionForm from './components/ProjectDescriptionFrom';
import LoginSignup from './components/LoginSignup';
import Header from './components/Header/Header';
import LandingPage from "./components/LandingPage/LandingPage";
import Footer from './components/Footer/Footer';
import JobSearch from './components/JobSearch/JobSearch';
import JobDetails from './components/JobDetails/JobDetails';
import TalentsFound from './components/TalentsFound/TalentsFound';

function App() {
  return (

    <div>
          <Header />
      
      <Routes>
            <Route path="/upload" element={<CVUploadingPage />} />
            <Route path="/projectform" element={<ProjectDescriptionForm/>} />
            <Route path="/home" element={ <LandingPage/> }  />
            <Route path="/" element={ <LoginSignup/> }  />
            <Route path="/job" element={<JobSearch/>} />
            <Route path="/talents-found" element={<TalentsFound/>} />
            </Routes>
      <Footer/>
    </div>
  );
}

export default App;
