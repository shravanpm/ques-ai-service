import mongoose from "mongoose";
import CatchAsyncError from "../middleware/catch_async_error.js";
import ProjectModel from "../models/project_model.js";
import ErrorHandler from "../utils/error_handler.js";

export const createProject = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { name } = req.body;
    const isNameExist = await ProjectModel.findOne({
      name: new RegExp(`^${name}$`, "i"),
    });

    if (isNameExist) {
      return next(new ErrorHandler("Name already exist", 400));
    }
    const payload = { name: name.trim(), user: userId };
    console.log({ payload });
    const project = await ProjectModel.create(payload);
    res.status(201).json({
      success: true,
      project,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getProjectById = CatchAsyncError(async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const project = await ProjectModel.findById(projectId).exec();

    if (!project) {
      return next(new ErrorHandler("Project not found", 404));
    }

    res.status(200).json({
      success: true,
      project,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteProjectById = CatchAsyncError(async (req, res, next) => {
  try {
    const projectId = req.params.id;

    const project = await ProjectModel.findById(projectId).exec();

    if (!project) {
      return next(new ErrorHandler("Project not found", 404));
    }

    const deletedProject = await ProjectModel.findByIdAndDelete(projectId);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getProjectsWithFiles = CatchAsyncError(async (req, res, next) => {
  const userId = req.user.id;

  try {
    const projects = await ProjectModel.aggregate([
      { $match: { user: new mongoose.Types.ObjectId(userId) } },
      {
        $lookup: {
          from: "files",
          localField: "_id",
          foreignField: "project",
          as: "files",
        },
      },
    ]);

    res.status(200).json({ success: true, projects });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
