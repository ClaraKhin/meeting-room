import express from "express";
import {
    createUser,
    deleteUser,
    getAllUsers,
    getUserById,
    updateUserRole,
} from "../controllers/userController.js";

const userRouter = express.Router();

// User management routes.
// Permission checks are handled inside userController.js.
userRouter.post("/", createUser);
userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.put("/:id/role", updateUserRole);
userRouter.delete("/:id", deleteUser);

export default userRouter;
