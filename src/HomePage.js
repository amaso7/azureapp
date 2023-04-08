import React from 'react';
import './index.css';

function HomePage() {
  return (
    <div>
      <h1>Azure for Health and Human Services LLC.</h1>
      <p>Please select your role:</p>
      <ul>
        <li><a href="/drlogin.js">Doctor Login</a></li>
        <li><a href="/login.js">Patient Login</a></li>
        <li><a href="/PatientSignup.js">Patient Signup</a></li>
      </ul>
    </div>
  );
}

export default HomePage;
