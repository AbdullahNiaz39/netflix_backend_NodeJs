const express = require("express");
const { errorHandler } = require("./middleware/errorMiddleware");
const dotenv = require("dotenv").config();
const goalRouter = require("./routes/goalRoutes");
const userRouter = require("./routes/userRoutes");
const connect = require("./config/db");

const port = process.env.PORT || 5000;

connect();

const app = express();

///To parse raw data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", goalRouter);
app.use("/api/users", userRouter);

//app.use(errorHandler);

app.listen(port, () => console.log(`Server run on port ${port}`));
