import React from 'react';
import { useLocation } from 'react-router-dom';

function PaymentSuccess() {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");
    const name = query.get("name");
    const email = query.get("email");
    const contact = query.get("contact");
    const amount = query.get("amount"); // in INR

    const payee = "NTI Tech Academy"; // Your business name
    const supportEmail = "support@ntitechacademy.com"; // Your support email

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <div className="card p-4 shadow-lg" style={{ maxWidth: "500px", background: "#f8fff9" }}>
                <div className="text-center mb-3">
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/845/845646.png"
                        alt="Success"
                        width="80"
                        className="mb-3"
                    />
                    <h2 className="fw-bold text-success">Payment Successful</h2>
                    <p className="text-muted">✅ Success! Thank you for your payment.</p>
                </div>

                <div className="border rounded p-3 bg-light">
                    <h5 className="mb-2">🧾 Payment Summary</h5>
                    {reference && <p><strong>Reference ID:</strong> {reference}</p>}
                    {amount && <p><strong>Amount Paid:</strong> ₹{amount}</p>}

                    <hr className="my-2" />

                    <h6 className="mt-3 mb-2">👤 Payer Details</h6>
                    {name && <p><strong>Name:</strong> {name}</p>}
                    {email && <p><strong>Email:</strong> {email}</p>}
                    {contact && <p><strong>Mobile:</strong> {contact}</p>}

                    <hr className="my-2" />

                    <h6 className="mt-3 mb-2">🏢 Payee (Business)</h6>
                    <p><strong>Business Name:</strong> {payee}</p>
                    <p><strong>Support Email:</strong> {supportEmail}</p>
                </div>

                <div className="mt-4 text-center">
                    <a href="/" className="btn btn-success me-2">Back to Home</a>
                    <button className="btn btn-outline-primary" onClick={() => window.print()}>
                        Download Receipt
                    </button>
                </div>
            </div>
        </div>
    );
}

export default PaymentSuccess;
