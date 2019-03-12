import React from 'react';
import './Dashboard.css';

const Dashboard = (props)=>{
  return(
    <section className="Dashboard">
      <h3>Dashboard</h3>
      <p>Welcome {props.user}</p>
    </section>
  );
};

export default Dashboard;