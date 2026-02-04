import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import geminiResponse from "./gemini.js";


dotenv.config();

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

// test route
app.get("/", (req, res) => {
  res.send("Backend running...");
});

// gemini route (example)
app.post("/api/ask", geminiResponse);

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server started on port", PORT);
});
mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err.message));