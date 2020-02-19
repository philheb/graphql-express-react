import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";

import "./Events.css";

import Modal from "../components/modal/Modal";
import EventItem from "../components/events/EventItem";

const Events = () => {
  const { token, userId } = useContext(AuthContext);

  const [showModal, setShowModal] = useState(false);

  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [values, setValues] = useState({
    title: "",
    description: "",
    price: "",
    date: ""
  });

  const { title, description, price, date } = values;

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          events {
            _id
            title
            description
            price
            date
            creator {
              _id
              email
            }
          }
        }
      `
    };

    fetch("http://localhost:8000/graphql", {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => {
        if (res.status !== 200 && res.status !== 201) {
          throw new Error("Failed!");
        }
        return res.json();
      })
      .then(resData => {
        if (isSubscribed) {
          setEvents(resData.data.events);
          setIsLoading(false);
        } else {
          return null;
        }
      })
      .catch(err => console.log(err));
    return () => (isSubscribed = false);
  }, []);

  const handleClickCreateEvent = () => {
    setShowModal(true);
  };

  const handleClickConfirm = () => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation {
          createEvent(eventInput: {title: "${title}", description: "${description}", price: ${price}, date: "${date}"}) {
            _id
            title
            description
            price
            date
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
      .then(resData => {
        setEvents(events => [
          ...events,
          {
            _id: resData.data.createEvent._id,
            title: resData.data.createEvent.title,
            description: resData.data.createEvent.description,
            price: resData.data.createEvent.price,
            date: resData.data.createEvent.date,
            creator: {
              _id: userId
            }
          }
        ]);
        setIsLoading(false);
      })
      .catch(err => console.log(err));
    setShowModal(false);
  };

  const handleClickCancel = () => {
    setShowModal(false);
  };

  const handleClickBackdrop = () => {
    setShowModal(false);
  };

  const handleChange = input => e => {
    setValues({ ...values, error: false, [input]: e.target.value });
  };

  const modal = () => (
    <Modal
      title='Add Event'
      canConfirm
      canCancel
      onConfirm={handleClickConfirm}
      onCancel={handleClickCancel}
      onClickBackdrop={handleClickBackdrop}
    >
      {createEventForm()}
    </Modal>
  );

  const createEventForm = () => (
    <form>
      <div className='form-group'>
        <input
          onChange={handleChange("title")}
          type='text'
          className='form-control'
          placeholder='Title'
          value={title}
          required
        />
      </div>

      <div className='form-group'>
        <input
          onChange={handleChange("price")}
          type='number'
          className='form-control'
          placeholder='Price'
          value={price}
          min='1.00'
          max='5.00'
          required
        />
      </div>
      <div className='form-group'>
        <input
          onChange={handleChange("date")}
          type='datetime-local'
          className='form-control'
          placeholder='Date'
          value={date}
          required
        />
      </div>
      <div className='form-group'>
        <textarea
          onChange={handleChange("description")}
          rows='4'
          className='form-control'
          placeholder='Description'
          value={description}
          required
        />
      </div>
    </form>
  );

  const showButton = () => {
    if (token) {
      return (
        <section className='d-flex justify-content-center'>
          <button
            className='btn btn-lg btn-primary'
            onClick={handleClickCreateEvent}
          >
            Create Event
          </button>
        </section>
      );
    }
  };

  const showEvents = () =>
    events.map(event => (
      <EventItem key={event._id} event={event} authUserId={userId} />
    ));

  return (
    <main style={{ marginTop: "120px" }}>
      {showModal ? modal() : null}
      {showButton()}
      <ul className='events__list'>
        {isLoading ? (
          <div className='text-center'>
            <div
              className='spinner-border text-light'
              style={{ width: "5rem", height: "5rem" }}
            >
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        ) : (
          showEvents()
        )}
      </ul>
    </main>
  );
};

export default Events;
