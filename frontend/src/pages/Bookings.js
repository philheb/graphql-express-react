import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import BookingItem from "../components/bookings/BookingItem";

import "./Bookings.css";
import BookingChart from "../components/bookings/BookingChart";

const Bookings = () => {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isChart, setIsChart] = useState(false);

  useEffect(() => {
    let isSubscribed = true;
    setIsLoading(true);
    const requestBody = {
      query: `
        query {
          bookings {
            _id
            createdAt
            event {
              _id
              title
              date
              price
              description
            }
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
        if (isSubscribed) {
          setBookings(resData.data.bookings);
          setIsLoading(false);
        }
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });

    return () => (isSubscribed = false);
  }, [token]);

  const handleCancelBooking = bookingId => {
    setIsLoading(true);
    const requestBody = {
      query: `
        mutation CancelBooking($id: ID!) {
          cancelBooking(bookingId: $id) {
            _id
            title
          }
        }
      `,
      variables: { id: bookingId }
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
        setBookings(
          bookings.filter(booking => {
            return booking._id !== bookingId;
          })
        );
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const showBookings = () => (
    <ul className='bookings__list'>
      {bookings.map(booking => {
        return (
          <BookingItem
            key={booking._id}
            booking={booking}
            cancelBooking={handleCancelBooking}
          />
        );
      })}
    </ul>
  );

  const showSpinner = () => (
    <div className='text-center'>
      <div
        className='spinner-border text-light'
        style={{ width: "5rem", height: "5rem" }}
      >
        <span className='sr-only'>Loading...</span>
      </div>
    </div>
  );

  const showTabs = () => (
    <div>
      {/* <div className='btn-group btn-group-toggle d-flex justify-content-center'> */}
      <div className='d-flex justify-content-center'>
        <button
          className={!isChart ? "btn btn-primary" : "btn btn-primary disabled"}
          onClick={() => setIsChart(!isChart)}
        >
          Your Bookings
        </button>
        <button
          className={
            isChart ? "btn btn-primary ml-3" : "btn btn-primary ml-3 disabled"
          }
          onClick={() => setIsChart(!isChart)}
        >
          Bookings Chart
        </button>
      </div>
      <div>
        {isChart ? <BookingChart bookings={bookings} /> : showBookings()}
      </div>
    </div>
  );

  return (
    <main className='bookings'>{isLoading ? showSpinner() : showTabs()}</main>
  );
};

export default Bookings;
