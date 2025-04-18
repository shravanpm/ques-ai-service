import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
  {
    name: { type: String, required: true, minLength: 4 },
    user: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ProjectModel = model("project", projectSchema);

export default ProjectModel;
