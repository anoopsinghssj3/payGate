import React, { useState } from 'react';
import { productData } from './productData.js';
import axios from "axios";

function Product() {
    const handleSubmit = async (e, price) => {
        e.preventDefault();
        const { data: keyData } = await axios.get("/api/v1/getKey")
        const { data: orderData } = await axios.post("/api/v1/payment/process", { price });

        const { order } = orderData;
        // console.log(order);

        const { key } = keyData;
        // console.log(key);

        const options = {
            key: keyData.key, // Replace with your Razorpay key_id
            amount: orderData.price,
            name: 'Acme Corp',
            description: 'Test Transaction',
            order_id: orderData.order.id,
            callback_url: '/api/v1/paymentVerification', // Your success URL
            prefill: {
                name: 'Gaurav Kumar',
                email: 'gaurav.kumar@example.com',
                contact: '9999999999'
            },
            theme: {
                color: '#F37254'
            },
        };

        const rzp = new Razorpay(options);
        rzp.open();

    }

    return (
        <>
            <div className="border border-2 row d-flex justify-content-center p-2">
                {productData.map((items) => (
                    <form action=""
                        onSubmit={(e) => handleSubmit(e, items.price)}
                        className="card col-md-4 d-flex align-items-center" key={items.id}>
                        <img src={items.src} alt="" className="w-50" />
                        <h3 className=" text-center bg-primary text-white w-100" >{items.title}</h3>
                        <h3 className="text-center bg-warning fs-4 w-100">${items.price}</h3>
                        <button className="bg-success text-white fw-bold w-100 border-0">pay ${items.price}</button>
                    </form>
                ))}
            </div>
        </>
    )
}

export default Product

