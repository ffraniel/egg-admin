import React, { useState } from 'react';
import './Login.css';

const Login = ({login}) => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
    console.log("login")
  }

  return (
    <section className="Login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          type="text"
          name="username"
          required
        />
        <label>Password</label>
        <input 
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          type="text"
          name="password"
        />
        <input type="submit" name="Sign In" value="Sign In"/>
      </form>
    </section>
  )
};

export default Login;