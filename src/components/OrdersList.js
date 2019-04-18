import React from "react";
import "./OrdersList.css";

const OrdersList = ({ orderList }) => {

  return (
    <section className="Order-List">
      {orderList.map((orderItem, i) => (
        <div className="Order-Item" key={orderItem.name + '-' + i}>
          <h4>{orderItem.name}</h4>
          <p>{orderItem.price}</p>
          <p>{orderItem.number}</p>
          <p>{orderItem.quantity}</p>
        </div>
      ))}
    </section>
  );
};

export default OrdersList;
