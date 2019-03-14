import React, { useState, useEffect } from 'react';
import './Dashboard.css';

const Dashboard = ({username, logout})=>{

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };

  const [eggQuantity, updateEgg] = useState(null);
  const [orders, updateOrders] = useState(null);

  const getEggs = () => {
    return fetch('https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/quantity')
      .then(res => res.json())
      .then(res => {
        updateEgg(res.total);
      })
      .catch(err => {
        console.log({error: err});
      });
  };

  useEffect(()=>{
    getEggs();
    fetchOrders();
  }, []);

  const addEgg = () => {
    return fetch(`https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/add/1`)
      .then(res => res.json())
      .then(res => {
        if (res.amount > 0) {
          updateEgg(res.total);
        } else {
          console.log("Did not update egg amount");
        }
      })
      .catch(err => console.log({error: err}));
  };

  const removeEgg = () => {
    return fetch(`https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/remove/1`)
    .then(res => res.json())
    .then(res => {
      if (res.amount > 0) {
        updateEgg(res.total);
      } else {
        console.log("Did not update egg amount");
      }
    })
    .catch(err => console.log({error: err}));
  };

  const fetchOrders = () => {
    fetch(`https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/orders`)
    .then(res => res.json())
    .then(res => {
      updateOrders(res.orders);
    })
    .catch(err => console.log({error: err}));
  };

  return(
    <section className="Dashboard">
      <h3>Dashboard</h3>
      <p>Welcome {username}</p>
      <button onClick={logoutHandler}>Log Out</button>
      {eggQuantity && 
      <section className="Dashboard-Display">
        <h3>Eggs: {eggQuantity}</h3>
        <div className="Button-Container">
          <button onClick={addEgg}>+</button>
          <button onClick={removeEgg}>-</button>
        </div>
      </section>}
      {orders &&
      <section className="Orders">
        <h3>Orders upcoming</h3>
        {orders.map((order)=>{
          return (
            <p>{order.name}</p>
          )
        })}

      </section>}

    </section>
  );
};

export default Dashboard;