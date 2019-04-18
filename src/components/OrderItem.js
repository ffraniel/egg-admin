import React, {useState} from 'react';
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

    const removeItemProcess = (id) => {
      let box = document.getElementById(id);
      box.classList.add('fade');
      setTimeout(()=>{
        handleRemoveItem(id);
      }, 800)
    };
    const totalCost = order.totalCost ? order.totalCost : order.order.reduce((acc, curr)=>{
      return acc + (curr.price * curr.quantity);
    }, 0);

    const requiredEggs = order.order.reduce((acc, curr) => {
      return acc + (curr.number * curr.quantity);
    }, 0);
    
    const orderClass = order.complete ? 'Order-Item-Parent Completed' : 'Order-Item-Parent'; 
    
  return (
    <div className={orderClass} key={order.id} id={order.id}>
      <h4>Customer: {order.name}</h4>
      <p>{dateDifference(order.date)}</p>
      <p className="order-ID">ID: {order.id}</p>
      <p>£{totalCost.toFixed(2)}</p>
      <p>{order.quantity}</p>
      <p>Completed: {order.complete ? 'YES' : 'NO' }</p>
      <p>Completed Date: {order.complete ? <span>{formatDate(order.completedDate)}</span> : <span>n/a</span>}</p>
      <p className="notes">Notes: 
        {order.notes !== "''" && 
          <span className="notes-text">{order.notes}</span>
        }
      </p>
      <p>Paid: {order.paid}</p>

      <p className="Product-Eggs">Order requires {requiredEggs || 'n/a'} eggs</p>
          {requiredEggs && 
            <>
              <button className="check-button" onClick={() => {checkOrderPossible(requiredEggs)}}>Check Availability</button>

              {eggsAvailable && 
                <div className="Eggs-Available">
                  {eggsAvailable === "NaN" && <></>}
                  {eggsAvailable >= requiredEggs && 
                    <h3 className="Available-Green">Order Can Be Completed!</h3>
                  }
                  {eggsAvailable < requiredEggs && 
                    <h3 className="Available-Red">Not Enough Eggs Available Currently!</h3> 
                  }
                </div>
              }

            </>
          }
          {!requiredEggs &&
            <button className="disable-button">Can't Check Order</button>
          }

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