import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Bookings = () => {
  const { token } = useContext(AuthContext);

  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
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
        <ul>
          {bookings.map(booking => (
            <div key={booking._id}>
              <p>{booking.event.title}</p>
            </div>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Bookings;
