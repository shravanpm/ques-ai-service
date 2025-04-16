import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_url = process.env.DB_URL;
const mongo_url = `mongodb+srv://${db_username}:${db_password}@${db_url}`;
async function connect() {
  try {
    await mongoose.connect(mongo_url);
    console.log("Database is connected");
  } catch (error) {
    console.error({ db_error: error });
  }
}

export default connect;
