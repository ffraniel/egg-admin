import React from 'react';
import './Login.css';

const Login = (props) => {

  return (
    <section className="Login">
      <h1>Login</h1>
      <form>
        <label>Username</label>
        <input type="text" value={props.username} onChange={props.handleInput}/>
        <label>Password</label>
        <input type="text" value={props.password} onChange={props.handleInput}/>
        <input type="submit" name="Sign In "/>
      </form>
    </section>
  )
};

export default Login;