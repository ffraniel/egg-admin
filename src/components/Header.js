import React from 'react';
import './Header.css';

const Header = ({username, logoutHandler}) => (
  <div className="Header">
    <h3>Welcome {username}</h3>
    <button className="log-out" onClick={logoutHandler}>Log Out</button>
  </div>
);

export default Header;