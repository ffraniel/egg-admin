import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from './Header';
import EggDisplay from './EggDisplay';
import OrdersSection from './OrdersSection';

const Dashboard = ({username, logout})=>{

  const logoutHandler = (e) => {
    e.preventDefault();
    logout();
  };

  const [eggQuantity, updateEgg] = useState(null);
  const [orders, updateOrders] = useState(null);
  const [amending, updateAmending] = useState(false);
  const [amendedValue, updateAmendedValue] = useState('');

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
    return fetch(`https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/orders`)
    .then(res => res.json())
    .then(res => {
      updateOrders(res);
    })
    .catch(err => console.log({error: err}));
  };

  const handleRemoveItem = (itemID) => {
    console.log("remove", itemID);
    const currentOrders = orders;
    // fire api call
    const filteredOrdersList = currentOrders.filter((item) => {
      return item.id !== itemID;
    });
    updateOrders(filteredOrdersList);
  };

  const handleMarkCompletedItem = (itemID) => {
    console.log("complete", itemID);
    const currentOrders = orders;
    //  fire api call 
    // also get completed date here
    const ordersWithCompleted = currentOrders.map((item)=>{
      if (item.id === itemID) {
        item.complete = !item.complete;
        return item;
      } else {
        return item;
      };
    });
    updateOrders(ordersWithCompleted);
  };


  const handleAmendItem = () => {
    updateAmending(!amending);
  };

  const handleSubmitAmend = (order) => {
    console.log("***", amendedValue, "***");
    const currentOrders = orders;
    const ordersUpdatedName = currentOrders.map((item)=>{
      if (order.id === item.id) {
        item.name = amendedValue;
        return item;
      } else {
        return item;
      }
    });
    updateOrders(ordersUpdatedName);
    updateAmending(!amending);
    // fire api call with amendedValue
    updateAmendedValue('');
  };

  const handleAmendValueChange = (e) => {
    updateAmendedValue(e.target.value);
  }

  return(
    <section className="Dashboard">
      <Header username={username} logoutHandler={logoutHandler} />
      <main className="Dashboard-Content">
        {eggQuantity && 
          <EggDisplay 
            eggQuantity={eggQuantity} 
            addEgg={addEgg} 
            removeEgg={removeEgg} 
          />
        }
        {orders &&
          <OrdersSection 
            orders={orders}
            handleRemoveItem={handleRemoveItem}
            handleMarkCompletedItem={handleMarkCompletedItem}
            handleAmendItem={handleAmendItem}
            amending={amending}
            handleSubmitAmend={handleSubmitAmend}
            amendedValue={amendedValue}
            handleAmendValueChange={handleAmendValueChange}
          />
        }
      </main>
    </section>
  );
};

export default Dashboard;