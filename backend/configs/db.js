
import mongoose from "mongoose";

export const connectDB = async () => {
    try {

        mongoose.connection.on('connected', () => console.log('DB connected'));
        await mongoose.connect(`${process.env.MONGO_URI}/meeting_room_booking_system`);

    } catch (error) {
        console.log(error);
    }
};