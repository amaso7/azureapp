import React from 'react';


function DrLoginPage() {
  return (
    <form className="form-container">
      <label className='form-label'>
        Email:
        <input type="email" name="email" className='form-input'/>
      </label>
      <label className='form-label'>
        Password:
        <input type="password" name="password" className='form-input' />
      </label>
      <button type="submit" className='form-button'>Login</button>
    </form>
  );
}

export default DrLoginPage;
