import React from 'react'
import { useLocation } from 'react-router-dom'

function PaymentSuccess() {
    const query = new URLSearchParams(useLocation().search);
    const reference = query.get("reference");

    return (<>
        <div className="container d-flex justify-content-center align-items-center p-5 text-center">
            <div className="card p-3">
                <h2 className="fw-bold" style={{ color: "rgba(12, 237, 42, 0.9)" }}>Payment Successful</h2>
                <p className=''> Success ! Thank you for the payment.</p>
                {
                    reference &&
                    <div className="p-2"  style={{ background: "rgba(227, 233, 227, 0.97)" }}>
                        <strong>Reference id: {reference} </strong>
                    </div>
                }
            </div>
        </div>
    </>
    )
}

export default PaymentSuccess