import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose, { modelNames } from "mongoose";
import { PORT, mongoDbURL } from "./config.js";
import { Booking } from "./bikeModel.js";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/bookings", async (req, res) => {
  const { firstName, lastName, email, modelName, date, timeSlot } = req.body;
  // Check if the slot is available
  // const existingBooking = await Booking.findOne({ modelName, date, timeSlot });
  // console.log(existingBooking);
  // if (existingBooking) {
  //   return res.status(400).json({ message: "Slot already booked" });
  // }

  try {
    const existingBooking = await Booking.findOne({
      modelName,
      date,
      timeSlot,
    });
    // console.log("Existing Booking:", existingBooking);
    if (existingBooking) {
      // console.log("Slot already booked");
      return res.status(400).json({ message: "Slot already booked" });
    }
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
  const formattedDate = new Date(date).toISOString().split("T")[0];

  // If slot is available, save the booking to the database
  const newBooking = new Booking({
    firstName,
    lastName,
    email,
    modelName,
    date: formattedDate,
    timeSlot,
  });

  await newBooking.save();
  res.status(201).json({ message: "Booking successful" });
});

app.listen(PORT, () => {
  console.log(`App is listening on ${PORT}`);
});

mongoose
  .connect(mongoDbURL)
  .then(() => {
    console.log("App is connected to the database");
  })
  .catch((error) => {
    console.log(error);
  });
