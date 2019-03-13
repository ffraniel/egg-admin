import React from 'react';
import './Dashboard.css';

const Dashboard = ({username, logout})=>{
  const logoutHandler = (e) => {
    console.log("logoutHandler")
    e.preventDefault();
    logout();
  }
  return(
    <section className="Dashboard">
      <h3>Dashboard</h3>
      <p>Welcome {username}</p>
      <button onClick={logoutHandler}>Log Out</button>
    </section>
  );
};

export default Dashboard;