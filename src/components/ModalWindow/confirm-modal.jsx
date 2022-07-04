import React, { useEffect, useRef } from "react";

import "./modal-window.css";

const ConfirmModal = ({ isHidden, setIsHidden, action, title, message }) => {
  const modalRef = useRef(null);

  const showModalIfNotHidden = () => {
    const classList = modalRef.current.classList;

    isHidden ? classList.add("modal-hidden") : classList.remove("modal-hidden");
  };

  useEffect(() => {
    showModalIfNotHidden();
  }, [isHidden]);

  return (
    <div ref={modalRef} className="modal modal-hidden">
      <div className="modal__body">
        <div className="modal__header">
          <p className="section-header">{title}</p>
          <button
            className="modal-btn--close"
            onClick={() => setIsHidden(true)}
          >
            <span></span>
          </button>
        </div>
        <div className="modal__content">
          <p>{message}</p>
          <div className="btn__container">
            <button
              className="btn-main-lg cancel-btn"
              onClick={() => setIsHidden(true)}
            >
              Cancel
            </button>
            <button className="btn-main-lg save-btn" onClick={action}>
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
