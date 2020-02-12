const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    creator: { type: ObjectId, ref: "User", required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);
