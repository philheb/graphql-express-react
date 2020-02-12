const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    event: { type: ObjectId, ref: "Event", required: true },
    user: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Booking", bookingSchema);
