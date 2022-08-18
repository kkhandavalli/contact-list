import React, { useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  useLocation,
  Route,
  Link
} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import { useNavigate } from 'react-router-dom';
import Home from './homepage.js'; 
import CreateContactContainer from './createContactContainer.js';

const data = require('./sample.json');

const App = (props) => {
  let navigate = useNavigate();
  
  const onVisaClick = () => {
    localStorage.setItem("contactList", JSON.stringify(data.contacts));
    navigate('/contacts');
    window.location.reload(false);
  }

  return (
        <div>
            <header className="App-header">
              <div className="header-text" onClick={onVisaClick}>
                <img src="https://usa.visa.com/content/dam/VCOM/global/about-visa/images/visa-brandmark-blue-1960x622.png" alt="image-not-found" height="35" width="75"/>
              </div>
              <div className="page-title">
                Contacts
              </div>
            </header>
            <Routes>
              <Route exact path="/" element={<Home/>}/>
              <Route exact path="/contacts" element={<Home/>}/>
              <Route exact path="/create" element={<CreateContactContainer mode="create"/>}/>
            </Routes>
        </div>
  );
};


export default App;
