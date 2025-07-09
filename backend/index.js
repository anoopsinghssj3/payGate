// backend/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import Razorpay from "razorpay";
import payment from "./routes/productRoute.js";
import path from "path";
dotenv.config();

const _dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Razorpay instance
export const instance = new Razorpay({
  key_id: process.env.RZR_KEY_ID,
  key_secret: process.env.RZR_KEY_SECRET,
});

app.use("/api/v1", payment);

app.use(express.static(path.join(_dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(_dirname, "client", "dist", "index.html"));
});

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on port ${process.env.PORT}`);
});
