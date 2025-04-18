import mongoose from "mongoose";

const { Schema, model } = mongoose;

const fileSchema = new Schema(
  {
    name: { type: String, required: true, lowercase: true },
    transcript: { type: String, required: true, lowercase: true },
    project: { type: Schema.Types.ObjectId, ref: "project" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FileModel = model("file", fileSchema);

export default FileModel;
