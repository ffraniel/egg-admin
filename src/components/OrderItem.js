import React from 'react';
import './OrderItem.css';
import OrdersList from './OrdersList';
import AmendItem from './AmendItem';
import {formatDate, dateDifference} from './Utility/Dates';

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
      setTimeout(()=>{
        handleRemoveItem(id);
      }, 800)
    };
    const totalCost = order.totalCost ? order.totalCost : order.order.reduce((acc, curr)=>{
      return (acc + (curr.price * curr.quantity)).toFixed(2);
    }, 0);

  return (
    <div className="Order-Item-Parent" key={order.id} id={order.id}>
      <h4>Customer: {order.name}</h4>
      <p>{dateDifference(order.date)}</p>
      <p className="order-ID">ID: {order.id}</p>
      <p>£{totalCost}</p>
      <p>{order.quantity}</p>
      <p>Completed: {order.complete ? 'YES' : 'NO' }</p>
      <p>Completed Date: {order.complete ? <span>{formatDate(order.completedDate)}</span> : <span>n/a</span>}</p>
      <p className="notes">Notes: 
        {order.notes !== "''" && 
          <span className="notes-text">{order.notes}</span>
        }
      </p>
      <p>{order.paid}</p>
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