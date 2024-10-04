import express from 'express'
import dotenv from 'dotenv'
dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const databaseURL= process.env.DATABASE_URL
const server = app.listen(port, () => {
  console.log(`Server is running: ${port} and database: ${databaseURL}`)
})