import { copyFileSync } from "fs";
import { instance } from "../index.js";
import crypto from "crypto";

export const paymentProcess = async (req, res) => {
    const { price } = req.body; // chatgpt
    const options = {
        amount: Number(req.body.price * 100),
        currency: "INR"
    }

    const order = await instance.orders.create(options);

    res.status(200).json({
        success: true,
        order
    })
}

export const getKey = async (req, res) => {
    res.status(200).json({
        key: process.env.RZR_KEY_ID,
    })
}
export const paymentVerification = async (req, res) => {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
        .createHmac("sha256", process.env.RZR_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = razorpay_signature === expectedSignature;

    if (isAuthentic) {
        // 🟢 Success: redirect OR send JSON — not both
        return res.redirect(`https://paygate-dqrl.onrender.com/paymentSuccess?reference=${razorpay_payment_id}`);
    } else {
        // 🔴 Failure
        return res.status(400).json({
            success: false,
            message: "Signature verification failed",
        });
    }
}
