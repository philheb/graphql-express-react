const mongoose = require("mongoose");
const { ObjectId } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true
    },
    password: {
      type: String,
      required: true
    },
    createdEvents: [{ type: ObjectId, ref: "Event", required: true }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
