const express = require("express");
const connectDB = require("./utils/db");
const app = express();
require("dotenv").config();
const createError = require("http-errors");
const cors = require("cors");
// Imports Routes here
const AuthUserRouter = require("./routes/auth");
const Blogrouter = require("./routes/blog");
const CommentsRouter = require("./routes/comments");
const ApplicationRouter = require("./routes/homedata")

app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);

app.use(express.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "DELETE, PUT, POST, GET");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  if ("OPTIONS" == req.method) {
    res.sendStatus(200);
  } else {
    next();
  }
});
//  configre Routes here
app.use("/auth/user", AuthUserRouter);
app.use("/blog", Blogrouter);
app.use("/comments", CommentsRouter);
app.use("/application", ApplicationRouter)
// Handle Error if user hit route which is not in applictaion
app.use((req, res, next) => {
  next(createError.NotFound("Route you are looking for not found."));
});

app.use((err, req, res, next) => {
  const error = new Error();
  error.message = err.message || "Internal Server Error.";
  error.status = err.status || 500;
  error.stack = err.stack || "Something Error";
  error.schema = err || null;
  res.status(error.status).json(error);
});
// connect with database
connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Yay app started on port ${PORT}`);
});
