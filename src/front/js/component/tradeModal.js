import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 

export const TradeModal = ({ redirectPath = "/trade" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleTrade = () => {
    setIsOpen(false);
    navigate(redirectPath); 
  };

  return (
    <>
      {/* Trade Button */}
      <button onClick={openModal} className="trade-button">
        Trade
      </button>

      {/* Modal */}
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Confirm Trade</h2>
            <p>Are you sure you want to proceed?</p>
            <div className="modal-actions">
              <button onClick={handleTrade} className="confirm-button">
                Yes, Trade
              </button>
              <button onClick={closeModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};


