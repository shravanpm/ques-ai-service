import express from "express";
import app from "./server/server.js";
import ErrorMiddleware from "./middleware/error.js";
import cors from "cors";
import "dotenv/config";
import UserRouter from "./routes/user_route.js";

app.use(express.json({ limit: "50mb" }));

app.use(cors({ origin: "*" }));

app.use("/api/user", UserRouter);

app.use(ErrorMiddleware);
