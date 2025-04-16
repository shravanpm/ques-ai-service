import express from "express";
const app = express();
import connect from "../db/database.js";

const port = process.env.PORT;

app.listen(port, async () => {
  try {
    await connect();
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error({ server_error: error });
  }
});

export default app;
