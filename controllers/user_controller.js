import CatchAsyncError from "../middleware/catch_async_error.js";
import UserModel from "../models/user_model.js";
import ErrorHandler from "../utils/error_handler.js";

export const createUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const isEmailExist = await UserModel.findOne({ email });

    if (isEmailExist) {
      return next(new ErrorHandler("Email already exist", 400));
    }

    const userBody = { email: email.trim(), password: password.trim() };
    const user = await UserModel.create({ ...userBody });
    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const getUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return next(new ErrorHandler("User not found", 400));
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const users = await UserModel.find().exec();
    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteUserById = CatchAsyncError(async (req, res, next) => {
  try {
    const userId = req.params.id;

    const user = await UserModel.findById(userId).exec();

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const deletedUser = await UserModel.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({
      email: new RegExp(`^${email}$`, "i"),
    });

    if (!user) {
      return next(new ErrorHandler("Wrong Email or Password is entered", 400));
    }

    const token = user.generateAuthToken();

    res.status(200).json({
      success: true,
      token,
      user,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
