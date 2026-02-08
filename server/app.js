import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/pageRoutes.js";
import dbConnect from "./config/db.js";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const allowedOrigins = [
  "http://localhost:5173",
  //todo - add frontend url here.
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(cookieParser());

dbConnect();

app.use("/api/v1", router);

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
