import React from "react";
import { Link } from "react-router-dom";

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
          {props.confirmText && props.confirmText === "Book" && (
            <button className='btn btn-primary ml-2' onClick={props.onBook}>
              {props.confirmText}
            </button>
          )}
          {props.confirmText && props.confirmText === "Log in to Book" && (
            <Link to='/login'>
              <button className='btn btn-primary ml-2'>
                {props.confirmText}
              </button>
            </Link>
          )}
        </section>
      </div>
    </>
  );
};

export default Modal;
