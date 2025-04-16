import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
} from "../controllers/user_controller.js";
import { authenticate } from "../middleware/authenticate.js";

const UserRouter = express.Router();

UserRouter.post("/", createUser);
UserRouter.get("/", getAllUsers);
UserRouter.get("/:id", getUserById);
UserRouter.delete("/:id", authenticate, deleteUserById);
UserRouter.post("/login", loginUser);

export default UserRouter;
