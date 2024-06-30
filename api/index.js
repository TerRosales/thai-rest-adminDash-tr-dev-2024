import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";

dotenv.config();
const app = express();
mongoose
  .connect(process.env.PRTMONGO)
  .then(() => {
    console.log("Connected to MongoDB 😁");
    app.listen(process.env.PORT, () => {
      console.log(
        `Server is running on port ${process.env.PORT}, Happy Coding! 😁`
      );
    });
  })
  .catch((error) => {
    console.error(`🤬 Error connecting to MongoDB: ${error} 🤬`);
  });

app.use(express.json());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
