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