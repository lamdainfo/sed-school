import React from "react";
import paymentSuccess from "../../images/paymentSuccess.png";

const PaymentSuccess = (props) => {
 
  return (
    <main className="page-content">
      <div className="row">
        <img
          src={paymentSuccess}
          alt="payment-success-img"
          style={{ margin: "80px auto" }}
        />
      </div>
    </main>
  );
};

export default PaymentSuccess;
