import Booking from "../models/Booking.js";

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

const isValidMongoId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

const checkLogin = (req, res) => {
    // No JWT or password logic here.
    // req.user should already come from middleware or role selection.
    if (!req.user) {
        sendError(res, 401, "Unauthorized");
        return false;
    }

    return true;
};

const canDeleteAnyBooking = (role) => {
    return role === "admin" || role === "owner";
};

const getCurrentUserId = (req) => {
    const userId = req.user.id || req.user._id;
    return userId ? userId.toString() : null;
};

const getBookingUserId = (booking) => {
    if (!booking.userId) return null;

    if (booking.userId._id) {
        return booking.userId._id.toString();
    }

    return booking.userId.toString();
};

const formatBooking = (booking) => {
    const user = booking.userId;
    const userId = getBookingUserId(booking);

    return {
        id: booking._id.toString(),
        userId,
        user: user && user.name ? {
            id: userId,
            name: user.name,
            role: user.role,
        } : undefined,
        startTime: booking.startTime,
        endTime: booking.endTime,
        createdAt: booking.createdAt,
    };
};

const isValidDate = (date) => {
    return date instanceof Date && !isNaN(date.getTime());
};

export const createBooking = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        const { startTime, endTime } = req.body;
        const userId = getCurrentUserId(req);

        if (!userId || !isValidMongoId(userId)) {
            return sendError(res, 401, "Invalid logged in user");
        }

        if (!startTime || !endTime) {
            return sendError(res, 400, "Start time and end time are required");
        }

        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            return sendError(res, 400, "Start time and end time must be valid dates");
        }

        if (startDate >= endDate) {
            return sendError(res, 400, "Start time must be before end time");
        }

        // Overlap rule:
        // New booking overlaps when newStart < existingEnd AND newEnd > existingStart.
        // Back-to-back bookings are allowed because equal times do not overlap.
        const overlapBooking = await Booking.findOne({
            startTime: { $lt: endDate },
            endTime: { $gt: startDate },
        });

        if (overlapBooking) {
            return sendError(res, 400, "Booking time overlaps with another booking");
        }

        const booking = await Booking.create({
            userId,
            startTime: startDate,
            endTime: endDate,
        });

        return res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: formatBooking(booking),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while creating booking");
    }
};

export const getAllBookings = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        const bookings = await Booking.find()
            .populate("userId", "name role")
            .sort({ startTime: 1 });

        return res.status(200).json({
            success: true,
            count: bookings.length,
            data: bookings.map(formatBooking),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while getting bookings");
    }
};

export const deleteBooking = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        const { id } = req.params;

        if (!isValidMongoId(id)) {
            return sendError(res, 400, "Invalid booking id");
        }

        const booking = await Booking.findById(id);

        if (!booking) {
            return sendError(res, 404, "Booking not found");
        }

        const currentUserId = getCurrentUserId(req);
        const bookingUserId = booking.userId.toString();

        if (!canDeleteAnyBooking(req.user.role) && currentUserId !== bookingUserId) {
            return sendError(res, 403, "You can only delete your own booking");
        }

        await Booking.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Booking deleted successfully",
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while deleting booking");
    }
};

export const getBookingsGroupedByUser = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        if (req.user.role !== "owner" && req.user.role !== "admin") {
            return sendError(res, 403, "Only owner or admin can view grouped bookings");
        }

        const bookings = await Booking.find()
            .populate("userId", "name role")
            .sort({ startTime: 1 });

        const groupedBookings = {};

        bookings.forEach((booking) => {
            const user = booking.userId;
            const userId = getBookingUserId(booking);
            const userName = user && user.name ? user.name : "Unknown User";

            if (!groupedBookings[userId]) {
                groupedBookings[userId] = {
                    userId,
                    name: userName,
                    bookings: [],
                };
            }

            groupedBookings[userId].bookings.push(formatBooking(booking));
        });

        return res.status(200).json({
            success: true,
            data: Object.values(groupedBookings),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while getting grouped bookings");
    }
};

export const getBookingSummary = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        if (req.user.role !== "owner" && req.user.role !== "admin") {
            return sendError(res, 403, "Only owner or admin can view booking summary");
        }

        const bookings = await Booking.find().populate("userId", "name role");
        const summary = {};

        bookings.forEach((booking) => {
            const user = booking.userId;
            const userId = getBookingUserId(booking);
            const userName = user && user.name ? user.name : "Unknown User";


            if (!summary[userId]) {
                summary[userId] = {
                    userId,
                    name: userName,
                    totalBookings: 0,
                };
            }

            summary[userId].totalBookings += 1;
        });

        return res.status(200).json({
            success: true,
            totalBookings: bookings.length,
            data: Object.values(summary),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while getting booking summary");
    }
};

export default {
    createBooking,
    getAllBookings,
    deleteBooking,
    getBookingsGroupedByUser,
    getBookingSummary,
};
