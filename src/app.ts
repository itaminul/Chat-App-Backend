import express from "express";
import dotenv from "dotenv";
import http from "http";
import router from "./routes/indexRoutes";
import bodyParser from "body-parser";
import { setupSocket } from "./socket";
import path from "path";
import cors from "cors"; // Import cors
import session from "express-session";
// const session = require('express-session');
dotenv.config();

const app = express();
// setting the session middleware
app.use(
  session({
    secret: "gfg-key",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const port = process.env.PORT || 3001;

const databaseURL = process.env.DATABASE_URL;
app.use("/api", router);

const server = http.createServer(app);
const io = setupSocket(server);
server.listen(port, () => {
  console.log(`Server is running: ${port} and database: ${databaseURL}`);
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
