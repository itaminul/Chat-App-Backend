import express from "express";
import dotenv from "dotenv";
import router from "./routes/indexRoutes";
dotenv.config();

const app = express();

const port = process.env.PORT || 3001;
const databaseURL = process.env.DATABASE_URL;
app.use("/api", router);
const server = app.listen(port, () => {
  console.log(`Server is running: ${port} and database: ${databaseURL}`);
});
