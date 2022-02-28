import { useState } from 'react';
import axios from 'axios';

const SignupPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
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
    } catch (error) {
      setErrors(error.response.data.errors);
    }
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
      {errors.length > 0 && (
        <div className='alert alert-danger'>
          <h4>Ooups....</h4>
          <ul className='my-0'>
            {errors.map((error) => {
              return <li key={error.message}>{error.message}</li>;
            })}
          </ul>
        </div>
      )}
      <button type='submit' className='btn btn-primary mt-3'>
        Sign Up
      </button>
    </form>
  );
};

export default SignupPage;
