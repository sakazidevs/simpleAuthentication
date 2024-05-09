import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false); // Initialize as false to show login fields by default
  const [token, setToken] = useState('');

  const handleSignup = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        username,
        email,
        password,
        confirmPassword,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        identifier: email, // Use email or username for login
        password,
      });
      setToken(response.data.token);
      console.log('Logged in successfully');
    } catch (error) {
      console.error(error.response.data.message);
    }
  };

  const handleLogout = () => {
    setToken('');
    console.log('Logged out successfully');
  };

  return (
    <div className="container">
      <h1>Simple Authentication</h1>
      {token ? (
        <>
          <p className="message">Welcome to Sakazidevs</p>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          {!isSignup ? (
            <>
              <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <button onClick={handleLogin}>Log In</button>
            </>
          ) : (
            <>
              <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} />
              <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
              <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
              <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
              <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
              <button onClick={handleSignup}>Sign Up</button>
            </>
          )}
          <button onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Switch to Log In' : 'Switch to Sign Up'}
          </button>
        </>
      )}
    </div>
  );
}

export default App;
