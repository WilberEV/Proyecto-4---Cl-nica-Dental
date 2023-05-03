import mongoose from "mongoose";

export const Appointment = mongoose.model(
  "Appointment",
  new mongoose.Schema({
    client: {
      type: String,
      required: true,
      ref: "User",
    },
    doctor: {
      type: String,
      required: true,
      ref: "User",
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    active: {
        type: Boolean,
        default: true
    }
  })
);

export interface IAppointment {
  start: Date;
  end: Date;
  client: string;
  doctor: string;
}
