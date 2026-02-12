import dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import dbConnection from "./db/db.js";

await dbConnection.connect();

const PORT = process.env.PORT || 3000;
const app = express();



const corsOption = {
  origin: true, // This allows all origins
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOption));


// cookie  configuration
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.get("/", (req, res) => {
  res.send("SugerShift Working...");
});

app.listen(PORT, () => {
  console.log("App is Listen On PORT: ", PORT);
});
