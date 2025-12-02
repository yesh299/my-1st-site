import React, { useState, useEffect } from "react";
import ReactDom from "react-dom";

import Backdrop from "./Backdrop";
import "./Modal.css";

const ModalOverlay = (props) => {
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (props.show) {
      setIsAnimating(true);
    } else {
      setIsAnimating(false);
    }
  }, [props.show]);

  if (!props.show && !isAnimating) return null;

  const content = (
    <div 
      className={`modal ${isAnimating ? 'modal-enter-active' : 'modal-exit-active'}`} 
      style={props.style}
    >
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={props.onSubmit ? props.onSubmit : (e) => e.preventDefault()}
      >
        <div className={`modal__content ${props.contentClass}`}>
          {props.children}
        </div>
        <footer className={`modal__footer ${props.footerClass}`}>
          {props.footer}
        </footer>
      </form>
    </div>
  );
  return ReactDom.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <ModalOverlay {...props} />
    </React.Fragment>
  );
};

export default Modal;
