import React, { useState } from 'react';

export const TradeModal = ({ isOpen, onClose, onTrade, coinName }) => {
  const [quantity, setQuantity] = useState(0);

  if (!isOpen) return null;

  const handleTrade = (type) => {
    onTrade(type, quantity);
    setQuantity(0); 
    onClose(); 
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Trade {coinName}</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="0"
        />
        <div className="buttons">
          <button onClick={() => handleTrade('buy')}>Buy</button>
          <button onClick={() => handleTrade('sell')}>Sell</button>
        </div>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

