import { instance } from "../index.js";
import path from "path";
import { fileURLToPath } from "url";
const _dirname = path.dirname(fileURLToPath(import.meta.url));



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

    const crypto = await import('crypto');
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", process.env.RZR_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    const isAuthentic = razorpay_signature === expectedSignature;

    if (isAuthentic) {
        return res.redirect(
            `/views/success.html?reference=${razorpay_payment_id}`
        );
    } else {
        return res.status(400).json({
            success: false,
            message: "Signature verification failed",
        });
    }
};
