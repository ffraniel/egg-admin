import React from "react";
import "./OrdersList.css";

const OrdersList = ({ orderList }) => {

  return (
    <section className="Order-List">
      {orderList.map((orderItem, i) => (
        <div className="Product" key={orderItem.name + '-' + i}>
          <h4 className="Product-Name">{orderItem.name}</h4>
          <p className="Product-Price">£{orderItem.price.toFixed(2)}</p>
          <p className="Product-Quantity">Quantity: {orderItem.quantity}</p>
        </div>
      ))}
    </section>
  );
};

export default OrdersList;
