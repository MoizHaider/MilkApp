const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const auth = require("./middleware/auth");
const userRoutes = require("./routes/user.js");

require("dotenv").config();

const app = express();

// app.use("/public", express.static(path.join(__dirname, "public")));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "*");
//     res.setHeader(
//       "Access-Control-Allow-Methods",
//       "OPTIONS, GET, POST, PUT, PATCH, DELETE"
//     );
//     res.setHeader("Access-Control-Allow-Headers", "*");
//     if (req.method === "OPTIONS") {
//       return res.sendStatus(200);
//     }
//     next();
//   })

app.use(cors());
app.options("*", cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(auth);

app.use("/user", userRoutes);

app.use((err, req, res, next) => {
  const errStatus = err.statusCode || 500;
  const errMsg = err.message || "Server Error";
  res.status(errStatus).json({
    success: false,
    status: errStatus,
    message: errMsg,
    stack: process.env.NODE_ENV === "development" ? err.stack : {}, //NOTE: _ err.stack shows the exact file and line number the error occured. This is only needed in developement mode to debug your code. It becomes dangerous when your project structure is exposed on production_
  });
});

mongoose
  .connect(process.env.MONGODB_URI, {})
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch((err) => {
    console.log("Could not connect to the database.", err);
  });

server = app.listen(8080, () => {
  console.log("listening on port 8080");
});
