import React, { useState } from "react";
import "./OrdersList.css";

const OrdersList = ({ orderList }) => {
  const [eggsAvailable, updateEggsAvailable] = useState(null);

  const checkOrderPossible = (number) => {
      return fetch('https://wt-68dc6486277619b05f4ee73ad2a8a48e-0.sandbox.auth0-extend.com/egg-store-be/quantity')
        .then(res => res.json())
        .then(res => {
          updateEggsAvailable(res.total);
        })
        .catch(err => {
          console.log({error: err});
        });
  };

  return (
    <section className="Order-List">
      {orderList.map((orderItem, i) => (
        <div className="Product" key={orderItem.name + '-' + i}>
          <h4 className="Product-Name">{orderItem.name}</h4>
          <p className="Product-Price">£{orderItem.price.toFixed(2)}</p>
          <p className="Product-Quantity">Quantity: {orderItem.quantity}</p>
          
          <p className="Product-Eggs">Order requires {orderItem.number || 'n/a'} eggs</p>
          {orderItem.number && 
            <>
              <button onClick={() => {checkOrderPossible(orderItem.number)}}>Check Availability</button>
              {eggsAvailable && 
                <div className="Eggs-Available">
                  {eggsAvailable >= orderItem.number && 
                    <h3 className="Available-Green">Order Can Be Completed!</h3>
                  }
                  {eggsAvailable < orderItem.number && 
                    <h3 className="Available-Red">Not Enough Eggs Available Currently!</h3> 
                  }
                </div>
              }
            </>
          }
          {!orderItem.number &&
            <button className="disable-button">Can't Check Order</button>
          }

        </div>
      ))}
    </section>
  );
};

export default OrdersList;
