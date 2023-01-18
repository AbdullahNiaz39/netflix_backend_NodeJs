const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
const connect = require("./config/db");
const cors = require("cors");

const port = 5000;

//DataBase Connected
connect();

///To parse raw data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/api/goals", goalRouter);
app.use("/api/users", userRouter);

//Error Finding
app.use(errorHandler);
app.use(morgan("dev"));

app.listen(port, () => console.log(`Server run on port ${port}`));
