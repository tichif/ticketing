import { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitHandler = async (e) => {
    e.preventDefault();
    const { data } = await axios.post(
      '/api/users/signup',
      { email, password },
      {
        headers: {
          'COntent-Type': 'application/json',
        },
      }
    );
    console.log(data);
  };

  return (
    <form onSubmit={submitHandler}>
      <h1>Sign Up</h1>
      <div className='form-group'>
        <label htmlFor='email'>Email Address</label>
        <input
          type='email'
          className='form-control'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className='form-group'>
        <label htmlFor='Password'>Password</label>
        <input
          type='password'
          className='form-control'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button type='submit' className='btn btn-primary mt-3'>
        Sign Up
      </button>
    </form>
  );
};

export default SignupPage;
