import React, { useEffect } from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { paymentStatus } from "../helpers/payment";

function PaymentSuccess() {
  const params = useParams();
  const { id: session_id } = params;
  const { userInfo } = useSelector((state) => state.userSignin);
  const [, setStatus] = useState();
  const [type, setType] = useState("");

  useEffect(() => {
    paymentStatus(session_id, userInfo._id).then((data) => {
      console.log(data);

      const { status, type } = data.session;
      setStatus(status);
      setType(type);
    });
    return () => {};
  }, [session_id, userInfo._id]);

  return (
    <div className={"success-container"}>
      <h1 className={"title"}>Payment Success</h1>
      <div className="card">
        <div
          style={{
            borderRadius: "200px",
            height: "200px",
            width: "200px",
            background: "#F8FAF5",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <i className="checkmark">✓</i>
        </div>
        <h1 className={"title"}>Success</h1>
        <p>Payment for {type} has been successfully processed.</p>
        <Link
          to="/profile"
          className={"flex column"}
          style={{ alignItems: "center" }}
        >
          <i className="fa fa-user"></i>
          <span>My Account</span>
        </Link>
      </div>
    </div>
  );
}

export default PaymentSuccess;
