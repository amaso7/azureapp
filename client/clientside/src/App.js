
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import HomePage from './HomePage';
import React from 'react';
import LoginPage from './login';
import DrLoginPage from './drlogin'
import PatientSignup from './PatientSignup';
import PtHome from './pthome';

function App() {
  return (
    <Router>
       <nav>
        
        
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/drlogin.js">Doctor Login</Link>
          </li>
          <li>
            <Link to="/login.js">Patient Login</Link>
          </li>
          <li>
            <ul id="patient-dropdown-menu">
              <li>
                <Link to="/PatientSignup.js">Sign Up</Link>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route path="/drlogin.js" element={<DrLoginPage/>} />
        <Route path="/login.js" element={<LoginPage/>} />
        <Route path="/PatientSignup.js" element={<PatientSignup/>} />
        <Route path="/pthome.js" element={<PtHome/>} />
        </Routes>
        </Router>
        
        

  );
}

export default App;