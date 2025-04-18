import {
  createProject,
  deleteProjectById,
  getProjectById,
  getProjectsWithFiles,
} from "../controllers/project_controller.js";
import { authenticate } from "../middleware/authenticate.js";
import express from "express";

const ProjectRouter = express.Router();

ProjectRouter.post("/", authenticate, createProject);
ProjectRouter.get("/files", authenticate, getProjectsWithFiles);
ProjectRouter.get("/:id", authenticate, getProjectById);
ProjectRouter.delete("/:id", authenticate, deleteProjectById);

export default ProjectRouter;
