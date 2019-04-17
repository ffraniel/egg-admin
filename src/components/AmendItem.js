import React from 'react';
import './AmendItem.css';

const AmendItem = ({
    order,
    handleSubmitAmend,
    amendedValue,
    handleAmendValueChange
  }) => {

  return (
        <div className="Amend-Item">
          <form onSubmit={(e) => {
              e.preventDefault();
              handleSubmitAmend(order);
            }}>
            <label>
              Amend order:
              <input type="text-area" value={amendedValue} onChange={handleAmendValueChange} />
            </label>
            <input type="submit" value="Submit" />
          </form>
        </div>
  );
};

  export default AmendItem;