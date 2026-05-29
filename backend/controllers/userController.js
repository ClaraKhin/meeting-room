import Booking from "../models/Booking.js";
import User from "../models/User.js";

const allowedRoles = ["admin", "owner", "user"];

const sendError = (res, statusCode, message) => {
    return res.status(statusCode).json({
        success: false,
        message,
    });
};

const formatUser = (user) => {
    return {
        id: user._id.toString(),
        name: user.name,
        role: user.role,
    };
};

const isValidMongoId = (id) => {
    return /^[0-9a-fA-F]{24}$/.test(id);
};

const isValidRole = (role) => {
    return allowedRoles.includes(role);
};

const checkLogin = (req, res) => {
    if (!req.user) {
        sendError(res, 401, "Unauthorized");
        return false;
    }

    return true;
};

const checkAdmin = (req, res) => {
    if (!checkLogin(req, res)) return false;

    if (req.user.role !== "admin") {
        sendError(res, 403, "Only admin can manage users");
        return false;
    }

    return true;
};

const isSameUser = (req, userId) => {
    const currentUserId = req.user.id || req.user._id;
    return currentUserId && currentUserId.toString() === userId;
};

// Create user
export const createUser = async (req, res) => {
    try {
        if (!checkAdmin(req, res)) return;

        const { name, role } = req.body;

        if (!name || !name.trim()) {
            return sendError(res, 400, "Name is required");
        }

        if (role && !isValidRole(role)) {
            return sendError(res, 400, "Role must be admin, owner, or user");
        }

        const user = await User.create({
            name: name.trim(),
            role: role || "user",
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully",
            data: formatUser(user),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while creating user");
    }
};

export const getAllUsers = async (req, res) => {
    try {
        if (!checkAdmin(req, res)) return;

        const users = await User.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            count: users.length,
            data: users.map(formatUser),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while getting users");
    }
};

export const getUserById = async (req, res) => {
    try {
        if (!checkLogin(req, res)) return;

        const { id } = req.params;

        if (!isValidMongoId(id)) {
            return sendError(res, 400, "Invalid user id");
        }

        // Admin can view any user. Other roles can view only their own user.
        if (req.user.role !== "admin" && !isSameUser(req, id)) {
            return sendError(res, 403, "You can only view your own user");
        }

        const user = await User.findById(id);

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        return res.status(200).json({
            success: true,
            data: formatUser(user),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while getting user");
    }
};

export const updateUserRole = async (req, res) => {
    try {
        if (!checkAdmin(req, res)) return;

        const { id } = req.params;
        const { role } = req.body;

        if (!isValidMongoId(id)) {
            return sendError(res, 400, "Invalid user id");
        }

        if (!role) {
            return sendError(res, 400, "Role is required");
        }

        if (!isValidRole(role)) {
            return sendError(res, 400, "Role must be admin, owner, or user");
        }

        const user = await User.findByIdAndUpdate(
            id,
            { role },
            { new: true, runValidators: true }
        );

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        return res.status(200).json({
            success: true,
            message: "User role updated successfully",
            data: formatUser(user),
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while updating user role");
    }
};

export const deleteUser = async (req, res) => {
    try {
        if (!checkAdmin(req, res)) return;

        const { id } = req.params;

        if (!isValidMongoId(id)) {
            return sendError(res, 400, "Invalid user id");
        }

        const user = await User.findById(id);

        if (!user) {
            return sendError(res, 404, "User not found");
        }

        // Requirement decision: when a user is deleted,
        // all bookings created by that user are also deleted.
        await Booking.deleteMany({ userId: id });
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "User and user's bookings deleted successfully",
        });
    } catch (error) {
        return sendError(res, 500, "Something went wrong while deleting user");
    }
};

export default {
    createUser,
    getAllUsers,
    getUserById,
    updateUserRole,
    deleteUser,
};
