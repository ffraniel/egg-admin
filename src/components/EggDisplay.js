import React from 'react';
import './EggDisplay.css';

const EggDisplay = ({  
    eggQuantity, 
    addEgg, 
    removeEgg
  }) => {

  return (
    <section className="Dashboard-Egg-Display">
      <h3>Eggs: {eggQuantity}</h3>
      <div className="Button-Container">
        <button onClick={addEgg}>+</button>
        <button onClick={removeEgg}>-</button>
      </div>
    </section>
  );
};

export default EggDisplay;