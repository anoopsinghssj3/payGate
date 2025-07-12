import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();
import Razorpay from "razorpay";
import payment from "./routes/productRoute.js";
import path from "path";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

const _dirname = path.resolve();

app.use("/api/v1", payment);

app.get("/paymentSuccess", (req, res) => {
    res.status(200).json({
        success: true,
        order
    })
})

app.get("/api/v1/fetch-payment-details", async (req, res) => {
    const payment_id = req.query.payment_id;

    if (!payment_id) {
        return res.status(400).json({ error: "Missing payment ID" });
    }

    try {
        const payment = await razorpay.payments.fetch(payment_id);

        res.json({
            reference: payment.id,
            amount: payment.amount / 100,
            name: payment.notes.name,
            email: payment.notes.email,
            contact: payment.notes.contact,
            payee: "NTI Tech Academy",
            supportEmail: "support@ntitechacademy.com"
        });
    } catch (err) {
        console.error("Error fetching payment:", err);
        res.status(500).json({ error: "Failed to fetch payment data" });
    }
});


export const instance = new Razorpay({
    key_id: process.env.RZR_KEY_ID,
    key_secret: process.env.RZR_KEY_SECRET,
});


instance.orders.all().then(console.log).catch(console.error);

app.use(express.static(path.join(_dirname, "/client/dist")));
// app.get("*", (req, res) => {
//     res.sendFile(path.resolve(_dirname, "client", "dist", "index.html"))
// })

app.listen(process.env.PORT, () => {
    console.log(`server running port: ${process.env.PORT}`)
})