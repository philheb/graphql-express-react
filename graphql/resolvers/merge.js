const Event = require("../../models/event");
const User = require("../../models/user");
const { dateToString } = require("../../helpers/date");

const transformEvent = event => {
  return {
    ...event._doc,
    id: event.id,
    date: dateToString(event._doc.date),
    creator: user.bind(this, event._doc.creator)
  };
};

const transformBooking = booking => {
  return {
    ...booking._doc,
    _id: booking.id,
    user: user.bind(this, booking._doc.user),
    event: singleEvent.bind(this, booking._doc.event),
    createdAt: dateToString(booking._doc.createdAt),
    updatedAt: dateToString(booking._doc.updatedAt)
  };
};

const events = async eventIds => {
  const events = await Event.find({ _id: { $in: eventIds } });
  try {
    return events.map(event => {
      return transformEvent(event);
    });
  } catch (err) {
    throw err;
  }
};

const singleEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    return transformEvent(event);
  } catch (err) {
    throw err;
  }
};

const user = async userId => {
  const user = await User.findById(userId);
  try {
    return {
      ...user._doc,
      _id: user.id,
      createdEvents: events.bind(this, user._doc.createdEvents)
    };
  } catch (err) {
    throw err;
  }
};

exports.transformBooking = transformBooking;
exports.transformEvent = transformEvent;

// exports.events = events;
// exports.singleEvent = singleEvent;
// exports.user = user;
