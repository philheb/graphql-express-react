import React from "react";

import "./BookingItem.css";

const BookingItem = ({ booking, cancelBooking }) => {
  return (
    <li className='bookings__item'>
      <div className='bookings__item-data'>{booking.event.title}</div>
      <div className='bookings__item-actions'>
        <button
          className='btn btn-sm btn-outline-danger'
          onClick={() => cancelBooking(booking._id)}
        >
          Cancel
        </button>
      </div>
    </li>
  );
};

export default BookingItem;
