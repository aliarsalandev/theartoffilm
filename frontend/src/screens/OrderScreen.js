import Axios from "axios";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deliverOrder, detailsOrder } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import {
  ORDER_DELIVER_RESET,
  ORDER_PAY_RESET,
} from "../constants/orderConstants";
import { processCheckout } from "../helpers/payment";
import { getMessages, sendMessage } from "../helpers/media";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function OrderScreen(props) {
  const params = useParams();
  const { id: orderId } = params;

  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [sdkReady, setSdkReady] = useState(false);
  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [initiatePayment, setInitiatePayment] = useState(false);

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay } = orderPay;
  const orderDeliver = useSelector((state) => state.orderDeliver);
  const {
    loading: loadingDeliver,
    error: errorDeliver,
    success: successDeliver,
  } = orderDeliver;
  const dispatch = useDispatch();
  useEffect(() => {
    const addPayPalScript = async () => {
      const { data } = await Axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://www.paypal.com/sdk/js?client-id=${data}`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };
    if (
      !order ||
      successPay ||
      successDeliver ||
      (order && order._id !== orderId)
    ) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch({ type: ORDER_DELIVER_RESET });
      dispatch(detailsOrder(orderId));
    } else {
      if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, sdkReady, successPay, successDeliver, order]);

  useEffect(() => {
    getMessages(orderId, userInfo).then((data) => {
      setMessages(data);
    });
    return () => {};
  }, [orderId, userInfo]);

  // const successPaymentHandler = (paymentResult) => {
  //   dispatch(payOrder(order, paymentResult));
  // };

  const deliverHandler = () => {
    dispatch(deliverOrder(order._id));
  };

  const shippingCost = JSON.parse(localStorage.getItem("shippingCost"));
  const shipping_country = localStorage.getItem("shipping_country");

  return loading ? (
    <LoadingBox></LoadingBox>
  ) : error ? (
    <MessageBox variant="danger">{error}</MessageBox>
  ) : (
    <div>
      <h1 className={"title p-2"}>Order</h1>
      <div className="row top">
        <div className="col-2">
          <ul className={"list-type-none"}>
            <li>
              <div className="card card-body">
                <h2>Shipping</h2>
                <p>
                  <strong>Name:</strong> {order?.seller?.name} <br />
                  <strong>Address: </strong> {order.shippingAddress.address},
                  {order.shippingAddress.city},{" "}
                  {order.shippingAddress.postalCode},
                  {order.shippingAddress.country}
                </p>
                {order.isDelivered ? (
                  <MessageBox variant="success">
                    Delivered at {order.deliveredAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Delivered</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Payment</h2>
                <p>
                  <strong>Method:</strong> {order.paymentMethod}
                </p>
                {order.isPaid ? (
                  <MessageBox variant="success">
                    Paid at {order.paidAt}
                  </MessageBox>
                ) : (
                  <MessageBox variant="danger">Not Paid</MessageBox>
                )}
              </div>
            </li>
            <li>
              <div className="card card-body">
                <h2>Order Items</h2>
                <ul className={"list-type-none"}>
                  {order.orderItems.map((item) => (
                    <li key={item.product}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="min-30">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {symbol}{" "}
                          {(rates[currency] * item.price).toFixed(2)} = {symbol}
                          {item.qty * (rates[currency] * item.price).toFixed(2)}
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>

        <div className="col-1">
          <div className="card">
            <h3>Chat</h3>
            <div>
              <ul className="messages">
                {messages?.map(({ message, read }, index) => (
                  <li key={index}>
                    <div className="flex message between">
                      <span className="message">{message}</span>
                      <span>
                        {read ? (
                          <i className="fas fa-check-circle"></i>
                        ) : (
                          <i className="fas fa-check"></i>
                        )}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {!order?.isDelivered && !order?.isPaid && (
              <div>
                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name={"message"}
                    onChange={(e) => {
                      setMessage(e.target.value);
                    }}
                    className="form-control"
                    rows="3"
                  ></textarea>
                </div>
                <button
                  onClick={(e) => {
                    setMessages([
                      ...messages,
                      {
                        message,
                      },
                    ]);
                    sendMessage(order._id, userInfo, message).then(
                      (data) => {}
                    );
                  }}
                  className="btn btn-primary"
                >
                  Send
                </button>
              </div>
            )}
          </div>
          <div className="card card-body">
            <ul className={"list-type-none"}>
              <li>
                <h2>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>
                  {symbol} {(rates[currency] * order.itemsPrice).toFixed(2)}
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Shipping</div>
                  {symbol}{" "}
                  {(rates[currency] * +shippingCost[shipping_country]).toFixed(
                    2
                  )}
                </div>
              </li>

              <li>
                <div className="row">
                  <div>Tax</div>
                  <div>
                    {symbol} {(rates[currency] * order.taxPrice).toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <strong>
                      {symbol} {(rates[currency] * order.totalPrice).toFixed(2)}
                    </strong>
                  </div>
                </div>
              </li>

              <li>
                {/* <button
                  className="btn btn-primary"
                  onClick={() => {
                    transferToSeller(order._id, userInfo);
                  }}
                >
                  Transfer
                </button> */}
                {order.allowedToPay && !order.isPaid ? (
                  <div className="row">
                    <div>
                      <strong>Pay</strong>
                      {setInitiatePayment === true ? (
                        <i className="fas fa-spinner"></i>
                      ) : (
                        <></>
                      )}
                    </div>
                    <div>
                      <button
                        className="button-free s-b"
                        title={"Get Started"}
                        onClick={(e) => {
                          setInitiatePayment(true);
                          processCheckout(
                            currency,
                            order._id,
                            `${(rates[currency] * order.totalPrice).toFixed(
                              2
                            )}`,
                            "month",
                            1,
                            "poster",
                            order._id
                          ).then((data) => {
                            window.open(data.session.url, "_blank");
                          });
                        }}
                      >
                        Pay
                      </button>
                    </div>
                  </div>
                ) : (
                  <></>
                )}
              </li>

              {userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <li>
                  {loadingDeliver && <LoadingBox></LoadingBox>}
                  {errorDeliver && (
                    <MessageBox variant="danger">{errorDeliver}</MessageBox>
                  )}
                  <button
                    type="button"
                    className="primary block"
                    onClick={deliverHandler}
                  >
                    {initiatePayment === true ? "initiating..." : "Deliver"}
                    Deliver Order
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
