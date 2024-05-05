import mongoose from "mongoose";

const bikeSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  modelName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeSlot: {
    type: Number,
    required: true,
  },
});
export const Booking = mongoose.model("Bike", bikeSchema);
