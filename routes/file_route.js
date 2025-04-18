import {
  createFile,
  deleteFileById,
  editFileById,
  getFileById,
  getFilesByProjectId,
} from "../controllers/file_controller.js";
import { authenticate } from "../middleware/authenticate.js";
import express from "express";

const FileRouter = express.Router();

FileRouter.post("/", authenticate, createFile);
FileRouter.get("/project/:id", authenticate, getFilesByProjectId);
FileRouter.get("/:id", authenticate, getFileById);
FileRouter.delete("/:id", authenticate, deleteFileById);
FileRouter.patch("/:id", authenticate, editFileById);

export default FileRouter;
