import React from 'react';
import { useState } from 'react';
import zxcvbn from 'zxcvbn';
import './index.css'

const isValidEmail = (email) => {
    // Regular expression for email validation
    const emailRegex = /\S+@\S+\.\S+/;
    return emailRegex.test(email);
  };

const PatientSignUp = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    currentDoctor: '',
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePasswordStrength = (event) => {
    const password = event.target.value;
    const passwordScore = zxcvbn(password).score;
    setPasswordScore(passwordScore);
  };

  const [passwordScore, setPasswordScore] = useState(0);

  const validateForm = () => {
    const errors = {};

    if (!formData.firstName) {
      errors.firstName = 'First name is required';
    }

    if (!formData.lastName) {
      errors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email address';
    }

    if (!formData.dateOfBirth) {
      errors.dateOfBirth = 'Date of birth is required';
    }

    if (!formData.currentDoctor) {
      errors.currentDoctor = 'Current doctor is required';
    }

    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (passwordScore < 3) {
      errors.password = 'Password is not strong enough';
    }

    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

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
          <input type="text" name="firstName" className='form-input' value={formData.firstName} onChange={handleInputChange} />
          {errors.firstName && <div className="error-message">{errors.firstName}</div>}
        </label>
        <label className='form-label'>
          Last Name:
          <input type="text" name="lastName" className='form-input' value={formData.lastName} onChange={handleInputChange} />
          {errors.lastName && <div className="error-message">{errors.lastName}</div>}
        </label>
        <label className='form-label'>
          Email:
          <input type="email" name="email" className='form-input' value={formData.email} onChange={handleInputChange} />
          {errors.email && <div className="error-message">{errors.email}</div>}
        </label>
        <label className='form-label'>
          Password:
          <input type="password" name="password" className='form-input' value={formData.password} onChange={handleInputChange} onBlur={handlePasswordStrength} />
          {passwordScore > 0 && (
            <div className={`password-strength-meter strength-${passwordScore}`}>
              Password Strength: {passwordScore}/4
            </div>
          )}
          {errors.password && <div className="error-message">{errors.password}</div>}
        </label>
        <label className='form-label'>
          Confirm Password:
          <input type="password" name="confirmPassword" className='form-input' value={formData.confirmPassword} onChange={handleInputChange} />
          {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          
          
    </label>
    <label className='form-label'>
      Date of Birth:
      <input type="date" name="dateOfBirth" className='form-input' value={formData.dateOfBirth} onChange={handleInputChange} />
      {errors.dateOfBirth && <div className="error-message">{errors.dateOfBirth}</div>}
    </label>
    <label className='form-label'>
      Current Doctor:
      <input type="text" name="currentDoctor"className='form-input'value={formData.currentDoctor} onChange={handleInputChange} />
      {errors.currentDoctor && <div className="error-message">{errors.currentDoctor}</div>}
    </label>
    <button type="submit" className='form-button'>Sign Up</button>
  </form>
</div>);
}

export default PatientSignUp;