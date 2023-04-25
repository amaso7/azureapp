import axios from 'axios';

import React, { useState } from 'react'

import {  useNavigate } from 'react-router-dom'

import Validation from './loginValidation';



function Login() {    
  const [values, setValues] = useState({        
    email: '',        
    password: ''    
  })    
const navigate = useNavigate();
    const [errors, setErrors] = useState({})
    const [backendError, setBackendError] = useState([])
    const handleInput = (event) => {        
      setValues(prev => ({...prev, [event.target.name]: event.target.value}))
    
    }    
    const handleSubmit =(event) => {        
      event.preventDefault();        
      const err = Validation(values); setErrors(err);        
      if(err.email === "" && err.password === "") {            
        axios.post('http://localhost:8081/login', values)            
        .then(res => {                
          if(res.data.errors) {                    
            setBackendError(res.data.errors);                
          } else {                    
            setBackendError([]);                    
            if(res.data === "Success") {                        
              navigate('/PtHome.js');                    
            } else {                        
              alert("No record existed");                    
            }                
          }                            
        })            
        .catch(err => console.log(err));        
      }    
    }
  return (    
  <div className='d-flex justify-content-center align-items-center bg-primary vh-100'>        
  <div className='bg-white p-3 rounded w-25'>                     
  {                
  backendError ? backendError.map( e => (                    
  <p className='text-danger'>{e.msg}</p>                 
  )) : <span></span>            
  }            
  <form action="" onSubmit={handleSubmit} className="form-container">                
  <div className='mb-3'>                    
  <label htmlFor="email"><strong>Email</strong>
  </label>                    
  <input type="email" placeholder='Enter Email' name='email'                    onChange={handleInput} className='form-input'/>                    {errors.email && <span className='text-danger'> {errors.email}</span>}                </div>                <div className='mb-3'>                    <label htmlFor="password"><strong>Password</strong></label>                    <input type="password" placeholder='Enter Password' name='password'                    onChange={handleInput} className='form-input'/>                    {errors.password && <span className='text-danger'> {errors.password}</span>}                </div>                <button type='submit' className='form-button'> Log in</button>                                           </form>        </div>    </div>  )}
export default Login