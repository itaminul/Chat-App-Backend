import express from 'express';

import dotenv from "dotenv";
import http, { Server } from "http";
import router from "./routes/indexRoutes";
import bodyParser from "body-parser";
import { setupSocket } from "./socket";
import path from "path";
import cors from "cors"; // Import cors
import session from "express-session";
// const session = require('express-session');
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
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

const databaseURL = process.env.DATABASE_URL;
app.use("/api", router);

const server = http.createServer(app);
const io = new Server(server);

app.get('/socket', (req, res) => {
    res.send('Socket.IO Server is running');
});

io.on('connection', (socket) => {
    console.log('A user connected');
});


server.listen(port, () => {
  console.log(`Server is running: ${port} and database: ${databaseURL}`);
});

app.get("/", (req: any, res: any) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});
