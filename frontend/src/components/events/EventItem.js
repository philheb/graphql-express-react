import React from "react";

import "./EventItem.css";

const EventItem = ({ event }) => {
  return (
    <li className='events__list-item'>
      <div>
        <h1>{event.title}</h1>
        <h2>${parseFloat(event.price).toFixed(2)}</h2>
      </div>
      <div>
        <button className='btn btn-primary'>View Details</button>
      </div>
    </li>
  );
};

export default EventItem;
