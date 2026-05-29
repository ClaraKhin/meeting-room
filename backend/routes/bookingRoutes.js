import express from "express";
import {
    createBooking,
    deleteBooking,
    getAllBookings,
    getBookingSummary,
    getBookingsGroupedByUser,
} from "../controllers/bookingController.js";

const bookingRouter = express.Router();

bookingRouter.post("/", createBooking);
bookingRouter.get("/", getAllBookings);
bookingRouter.get("/grouped-by-user", getBookingsGroupedByUser);
bookingRouter.get("/summary", getBookingSummary);
bookingRouter.delete("/:id", deleteBooking);

export default bookingRouter;
