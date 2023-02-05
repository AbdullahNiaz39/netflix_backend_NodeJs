const express = require("express");
const app = express();
const { errorHandler } = require("./middleware/errorMiddleware");
const morgan = require("morgan");
const dotenv = require("dotenv").config();
const reviewRouter = require("./routes/reviewRoutes");
const userRouter = require("./routes/userRoutes");
const commentRouter = require("./routes/commentRoutes");
const connect = require("./config/db");
const cors = require("cors");

const port = 5000;

//DataBase Connected
connect();

///To parse raw data
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use("/", (req, res) => {
  res.send({ title: "Ali" });
});
app.use("/api/reviews", reviewRouter);
app.use("/api/users", userRouter);
app.use("/api/comments", commentRouter);

//Error Finding
app.use(errorHandler);

app.listen(port, () => console.log(`Server run on port ${port}`));
