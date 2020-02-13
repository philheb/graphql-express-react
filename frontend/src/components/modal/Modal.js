import React from "react";

import "./Modal.css";

const Modal = props => {
  return (
    <>
      <div className='custom-backdrop' onClick={props.onClickBackdrop}></div>
      <div className='custom-modal'>
        <header className='custom-modal__header'>
          <h1>{props.title}</h1>
        </header>
        <section className='custom-modal__content'>{props.children}</section>
        <section className='custom-modal__actions'>
          {props.canCancel && (
            <button className='btn btn-outline-danger' onClick={props.onCancel}>
              Cancel
            </button>
          )}
          {props.canConfirm && (
            <button className='btn btn-primary ml-2' onClick={props.onConfirm}>
              Confirm
            </button>
          )}
        </section>
      </div>
    </>
  );
};

export default Modal;
