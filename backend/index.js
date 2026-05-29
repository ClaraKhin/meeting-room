import express from "express";
import cors from "cors";
import dotenv from "dotenv/config";
import { connectDB } from "./configs/db.js";
import userRouter from "./routes/userRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import User from "./models/User.js";


const app = express();

await connectDB();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Meeting Room Booking API is running");
});

// Simple role selection middleware.
// Frontend should send selected user id in the x-user-id header.
app.use(async (req, res, next) => {
    try {
        const userId = req.headers["x-user-id"];

        if (!userId) {
            return next();
        }

        if (!/^[0-9a-fA-F]{24}$/.test(userId)) {
            return res.status(400).json({
                success: false,
                message: "Invalid x-user-id header",
            });
        }

        const user = await User.findById(userId).select("name role");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Selected user not found",
            });
        }

        req.user = {
            id: user._id.toString(),
            name: user.name,
            role: user.role,
        };

        next();
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Something went wrong while selecting user",
        });
    }
});

app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
