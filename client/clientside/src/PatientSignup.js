
import React from 'react';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import './index.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

const PatientSignUp = () => {
  const [values, setValues ] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    dateofbirth: '',
    currentdoctor: ''
  });

  const [errors, setErrors] = useState({})
  const handleInputChange = (event) => {
    setValues(prev =>({ ...prev, [event.target.name]: [event.target.value ]}))
  };

  const handlePasswordStrength = (event) => {
    const password = event.target.value;
    const passwordScore = zxcvbn(password).score;
    setPasswordScore(passwordScore);
  };

  const [passwordScore, setPasswordScore] = useState(0);

  const validateForm = () => {
    const errors = {};

    if (!values.firstname) {
      errors.firstname = 'First name is required';
    }

    if (!values.lastname) {
      errors.lastname = 'Last name is required';
    }

    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(values.email)) {
      errors.email = 'Invalid email address';
    }

    if (!values.dateofbirth) {
      errors.dateofbirth = 'Date of birth is required';
    }

    if (!values.currentdoctor) {
      errors.currentdoctor = 'Current doctor is required';
    }

    if (!values.password) {
      errors.password = 'Password is required';
    } else if (passwordScore < 3) {
      errors.password = 'Password is not strong enough';
    }

    

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    if (validateForm(values)) {
      axios.post('http://localhost:8081/ptsignup', values)
        .then(res => {
          navigate('/login.js');
        })
        .catch(err => console.log(err));
    }
    

    if (validateForm()) {
      // Send form data to server to create new user account
      // ...
    }
  };

  return (
    <div className="form-container">
      <h1 className='form-header'>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label className='form-label'>
          First Name:
          <input type="text" name="firstname" className='form-input' value={values.firstname} onChange={handleInputChange} />
          {errors.firstname && <div className="error-message">{errors.firstname}</div>}
        </label>
        <label className='form-label'>
          Last Name:
          <input type="text" name="lastname" className='form-input' value={values.lastName} onChange={handleInputChange} />
          {errors.lastname && <div className="error-message">{errors.lastname}</div>}
        </label>
        <label className='form-label'>
          Email:
          <input type="email" name="email" className='form-input' value={values.email} onChange={handleInputChange} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </label>
        <label className='form-label'>
          Password:
          <input type="password" name="password" className='form-input' value={values.password} onChange={handleInputChange} onBlur={handlePasswordStrength} />
          {passwordScore > 0 && (
            <div className={`password-strength-meter strength-${passwordScore}`}>
              Password Strength: {passwordScore}/4
            </div>
          )}
          {errors.password && <div className="error-message">{errors.password}</div>}
        </label>
        
    <label className='form-label'>
      Date of Birth:
      <input type="date" name="dateofbirth" className='form-input' value={values.dateofbirth} onChange={handleInputChange} />
      {errors.dateofbirth && <div className="error-message">{errors.dateofbirth}</div>}
    </label>
    <label className='form-label'>
      Current Doctor:
      <input type="text" name="currentdoctor"className='form-input'value={values.currentdoctor} onChange={handleInputChange} />
      {errors.currentdoctor && <div className="error-message">{errors.currentdoctor}</div>}
    </label>
    <button onClick={handleSubmit} type="submit" className='form-button'>Sign Up</button>
  </form>
</div>);
}

export default PatientSignUp;
