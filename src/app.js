import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import routes from "./routes/index.js";

dotenv.config();
connectDB();

const app = express();

// ✅ Allow all origins including localhost
app.use(
  cors({
    origin: "*", // allows requests from any domain
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

app.use("/api/v1", routes);

app.get("/api/v1/ping", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is alive 🔥",
    timestamp: new Date(),
  });
});

export default app;


