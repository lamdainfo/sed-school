import React from "react";
import paymentFailure from "../../images/paymentFailure.png";

const PaymentFailed = (props) => {
  return (
    <main className="page-content">
      <div className="row">
        <img
          src={paymentFailure}
          alt="payment-fail-img"
          style={{ margin: "80px auto" }}
        />
      </div>
    </main>
  );
};

export default PaymentFailed;
