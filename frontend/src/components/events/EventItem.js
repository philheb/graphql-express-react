import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

import "./EventItem.css";
import Modal from "../modal/Modal";

const EventItem = ({ event, authUserId }) => {
  const { token } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const handleClickBook = () => {
    if (!token) {
      setShowModal(false);
      return;
    }
    const requestBody = {
      query: `
        mutation {
          bookEvent(eventId: "${event._id}") {
            _id
            createdAt
            updatedAt
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {})
      .catch(err => console.log(err));
    setShowModal(false);
  };

  const handleClickCancel = () => {
    setShowModal(false);
  };

  const handleClickBackdrop = () => {
    setShowModal(false);
  };

  const handleViewDetails = () => {
    setShowModal(true);
  };

  const modal = () => (
    <Modal
      title={event.title}
      confirmText={token ? "Book" : "Log in to Book"}
      canCancel
      onBook={handleClickBook}
      onCancel={handleClickCancel}
      onClickBackdrop={handleClickBackdrop}
    >
      <p>
        {new Date(event.date).toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric"
        })}
      </p>
      <p>{event.description}</p>
      <p>${parseFloat(event.price).toFixed(2)}</p>
    </Modal>
  );

  return (
    <div>
      {showModal ? modal() : null}
      <li className='events__list-item'>
        <div>
          <h1>{event.title}</h1>
          <h2>
            ${parseFloat(event.price).toFixed(2)} -{" "}
            {new Date(event.date).toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "short",
              day: "numeric"
            })}
          </h2>
        </div>
        <div>
          {authUserId === event.creator._id ? (
            <p>This is your event</p>
          ) : (
            <button className='btn btn-primary' onClick={handleViewDetails}>
              View Details
            </button>
          )}
        </div>
      </li>
    </div>
  );
};

export default EventItem;
