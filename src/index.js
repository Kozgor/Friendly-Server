import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cardRouter from "./routes/cardRoute.js";
import boardRouter from "./routes/boardRoute.js";
import authRouter from "./routes/authRoute.js";
import columnRouter from "./routes/columnRoute.js";
import userRouter from "./routes/userRoute.js";
import boardsummaryRouter from "./routes/boardSummaryRoute.js";
import wakeUpFriendly from "./utils/wakeUpFriendly.js";

dotenv.config();

const app = express();

app.listen(process.env.PORT, () => {
  wakeUpFriendly(process.env.URL);
});
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("DB connected successfully!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Server runs at the port: 4444");
});

app.use("/auth", authRouter);

app.use("/user", userRouter);

app.use("/boards", boardRouter);

app.use("/card", cardRouter);

app.use("/columns", columnRouter);

app.use("/board_summary", boardsummaryRouter);
