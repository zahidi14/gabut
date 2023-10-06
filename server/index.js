const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
const routes = require("./Route/authRoute");
const cookieParser = require("cookie-parser");
require("dotenv").config();
const studentRoute = require("./Route/studentRoute");
const port = 8000;

const dbUrl = process.env.DB;
//MidleWare
// app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173", // Adjust this to your Vite project's origin
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // Allow credentials like cookies
};
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
//mongo
app.use((req, res, next) => {
  // res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, application/json"
  );
  next();
});
// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );
app.use("/admin", routes);
app.use("/student", studentRoute);
mongoose
  .connect(dbUrl)
  .then(() =>
    app.listen(port, () => {
      console.log("listening on port", port);
    })
  )
  .catch((err) => {
    console.log("error connecting to database", err);
  });
