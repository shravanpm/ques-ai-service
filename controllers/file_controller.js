import mongoose from "mongoose";
import CatchAsyncError from "../middleware/catch_async_error.js";
import FileModel from "../models/file_model.js";
import ErrorHandler from "../utils/error_handler.js";

export const createFile = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, transcript, project } = req.body;

    const file = await FileModel.create({
      name: name.trim(),
      transcript: transcript.trim(),
      project: project.trim(),
    });
    res.status(201).json({
      success: true,
      file,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getFileById = CatchAsyncError(async (req, res, next) => {
  try {
    const fileId = req.params.id;
    const file = await FileModel.findById(fileId).exec();

    if (!file) {
      return next(new ErrorHandler("File not found", 404));
    }

    res.status(200).json({
      success: true,
      file,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteFileById = CatchAsyncError(async (req, res, next) => {
  try {
    const fileId = req.params.id;

    const file = await FileModel.findById(fileId).exec();

    if (!file) {
      return next(new ErrorHandler("File not found", 404));
    }

    const deletedFile = await FileModel.findByIdAndDelete(fileId);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const editFileById = CatchAsyncError(async (req, res, next) => {
  // TODO
  try {
    const fileId = req.params.id;
    const file = await FileModel.findById(fileId).exec();

    if (!file) {
      return next(new ErrorHandler("File not found", 404));
    }

    res.status(200).json({
      success: true,
      file,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getFilesByProjectId = CatchAsyncError(async (req, res, next) => {
  try {
    const projectId = req.params.id;
    const files = await FileModel.find({
      project: new mongoose.Types.ObjectId(projectId),
    });
    res.status(200).json({
      success: true,
      files,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
