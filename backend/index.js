// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import payment from "./routes/productRoute.js";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RZR_KEY_ID,
  key_secret: process.env.RZR_KEY_SECRET,
});

// API routes
app.use("/api/v1", payment);

// Serve static frontend
app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
