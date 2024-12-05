import React, { useState } from "react";

export const TradeModal = ({ isOpen, onClose, onTrade, coinName }) => {
  const [quantity, setQuantity] = useState("");

  if (!isOpen) return null;

  const handleTrade = (type) => {
    if (quantity <= 0 || isNaN(quantity)) {
      alert("Please enter a valid quantity greater than 0.");
      return;
    }
    onTrade(type, parseFloat(quantity)); // Ensure quantity is passed as a number
    setQuantity(""); // Reset quantity
    onClose(); // Close the modal
  };

  return (
    <div className="modal" role="dialog" aria-labelledby="modal-title" aria-modal="true">
      <div className="modal-content">
        <h2 id="modal-title">Trade {coinName}</h2>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          placeholder="Enter quantity"
          min="0"
        />
        <div className="buttons">
          <button onClick={() => handleTrade("buy")}>Buy</button>
          <button onClick={() => handleTrade("sell")}>Sell</button>
        </div>
        <button className="close-button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
