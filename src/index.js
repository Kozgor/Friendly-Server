import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cardRouter from "./routes/cardRoute.js";
import boardRouter from "./routes/boardRoute.js";
import authRouter from "./routes/authRoute.js";
import columnRouter from "./routes/columnRoute.js";

dotenv.config();

const app = express();

app.listen(4444, (err) => {
  err ? console.log("Server error") : console.log("Connected!");
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

app.use('/auth', authRouter);

app.use('/boards', boardRouter);

app.use('/cards', cardRouter);

app.use('/columns', columnRouter);

app.use('/columns', columnRouter);

// app.post("/admin/settings", AdminController.saveAdminSettings);

// app.get("/admin/settings", AdminController.getAdminSettings);

// app.post('/boards/board-id/column-id/all-column-cards', Controller.getCards);

// app.post('/boards/board-id/column-id/edit-column-card', Controller.editCard);
