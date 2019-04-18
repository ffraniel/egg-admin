import React from 'react';
import './OrderItem.css';
import OrdersList from './OrdersList';
import AmendItem from './AmendItem';

const OrderItem = ({
    order,
    handleRemoveItem,
    handleMarkCompletedItem,
    handleAmendItem,
    amending,
    handleSubmitAmend,
    amendedValue,
    handleAmendValueChange
  }) => {

    const removeItemProcess = (id) => {
      let box = document.getElementById(id);
      box.classList.add('fade');
      console.log(box)
      setTimeout(()=>{
        handleRemoveItem(id);
      }, 750)
    };

  return (
    <div className="Order-Item-Parent" key={order.id} id={order.id}>
      <h4>Name: {order.name}</h4>
      <p>Received {order.date}</p>
      <p>{order.totalCost}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Completed: {order.complete ? 'true' : 'false' }</p>
      <p>Completed Date: {order.complete ? <span>{order.completedDate}</span> : <span>n/a</span>}</p>
      
      <OrdersList orderList={order.order} />

      <button onClick={(e)=>{
        e.preventDefault();
        removeItemProcess(order.id);
        
        }}>Remove</button>

      <button onClick={()=>{
        handleMarkCompletedItem(order.id);
        }}>Completed</button>

      <button onClick={()=>{
        handleAmendItem(order);
        }}>Amend</button>

      {amending && 
        <AmendItem 
          handleSubmitAmend={handleSubmitAmend}
          amendedValue={amendedValue}
          handleAmendValueChange={handleAmendValueChange}
        />
      }
  </div>
  )}

  export default OrderItem;