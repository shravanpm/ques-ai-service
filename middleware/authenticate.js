import CatchAsyncError from "./catch_async_error.js";
import ErrorHandler from "../utils/error_handler.js";

import jwt from "jsonwebtoken";

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) return reject(err);

      return resolve(decoded);
    });
  });
};

export const authenticate = CatchAsyncError(async (req, res, next) => {
  if (!req.headers.authorization)
    return next(
      new ErrorHandler("Authorization token not found or incorrect", 401)
    );

  if (!req.headers.authorization.startsWith("Bearer "))
    return next(
      new ErrorHandler("Authorization token not found or incorrect", 400)
    );

  const token = req.headers.authorization.trim().split(" ")[1];

  let decoded;
  try {
    decoded = await verifyToken(token);
  } catch (err) {
    return next(
      new ErrorHandler("Authorization token not found or incorrect", 401)
    );
  }
  req.user = decoded;

  return next();
});
