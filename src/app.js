const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cors=require("cors");
const cookieParser = require("cookie-parser");

app.use(
  cors({
    origin: "http://localhost:5173", // backend should know where the frontend is running
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

const authRouter=require("./routes/auth");
const profileRouter=require("./routes/profile");
const requestRouter=require("./routes/request");
const userRouter=require("./routes/user");
app.use("/" , authRouter);
app.use("/" , profileRouter);
app.use("/" , requestRouter);
app.use("/", userRouter);

connectDB()
  .then(() => {
    console.log("Database connection is established..");
    app.listen(3000, () => {
      console.log("Server is running on port 3000 !!");
    });
  })
  .catch((err) => {
    console.log("cannot be connected!!");
  });

