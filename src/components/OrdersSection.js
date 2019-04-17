import React from 'react';
import './OrdersSection.css';
import OrderItem from './OrderItem';

const OrdersSection = ({
    orders,
    handleRemoveItem,
    handleMarkCompletedItem,
    handleAmendItem,
    amending,
    handleSubmitAmend,
    amendedValue,
    handleAmendValueChange
  }) => {
  return (
    <section className="Orders">
      <h3>Orders upcoming</h3>
      {orders.map((order) => {
        return (
          <OrderItem 
            order={order}
            handleRemoveItem={handleRemoveItem}
            handleMarkCompletedItem={handleMarkCompletedItem}
            handleAmendItem={handleAmendItem}
            amending={amending}
            handleSubmitAmend={handleSubmitAmend}
            amendedValue={amendedValue}
            handleAmendValueChange={handleAmendValueChange}
          />
        );
        })
      }
    </section>
  );
}
export default OrdersSection;
