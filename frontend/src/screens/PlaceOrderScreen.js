import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { createOrder } from "../actions/orderActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { ORDER_CREATE_RESET } from "../constants/orderConstants";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function PlaceOrderScreen(props) {
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const [shippingAddress, setShippingAddress] = React.useState({});

  const navigate = useNavigate();
  let localStorage_shippingCost = {
    US: 0,
    CA: 0,
    UK: 0,
    GB: 0,
    JP: 0,
  };
  const cart = useSelector((state) => state.cart);
  if (localStorage.getItem("shippingCost") !== "undefined") {
    localStorage_shippingCost = JSON.parse(
      localStorage.getItem("shippingCost") ?? {}
    );
  }
  const shippingCost = localStorage_shippingCost;
  const shipping_country = localStorage.getItem("shipping_country");
  if (!cart.paymentMethod) {
    navigate("/payment");
  }
  const orderCreate = useSelector((state) => state.orderCreate);
  const { loading, success, error, order } = orderCreate;
  const toPrice = (num) => Number(num.toFixed(2)); // 5.123 => "5.12" => 5.12

  cart.itemsPrice = toPrice(
    cart.cartItems.reduce((a, c) => a + c.qty * c.price, 0)
  );

  cart.shippingCost = (isNaN(shippingCost[shipping_country]) ? 0 : +shippingCost[shipping_country])
  cart.totalPrice = cart.itemsPrice + (isNaN(shippingCost[shipping_country]) ? 0 : +shippingCost[shipping_country]);

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.userSignin);

  const placeOrderHandler = () => {
    dispatch(createOrder({ ...cart, orderItems: cart.cartItems }));
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
      dispatch({ type: ORDER_CREATE_RESET });
    }
  }, [dispatch, order, navigate, success]);

  useEffect(() => {
    if (localStorage.getItem("shipping_country")) {
      setShippingAddress(JSON.parse(localStorage.getItem("shippingAddress")));
    }
  }, []);

  return (
    <div>
      <CheckoutSteps step1 step2 step3 step4></CheckoutSteps>
      <div className="row top">
        <div className="col-2">
          <ul className={"list-type-none"}>
            <li>
              <div className="card card-body">
                <h2 className={"title2"}>Shipping</h2>
                <p>
                  <strong>Name:</strong> {userInfo?.name} <br />
                  <strong>Address: </strong> {shippingAddress.address},
                  {shippingAddress.city}, {shippingAddress.postalCode},
                  {shippingAddress.country}
                </p>
              </div>
            </li>

            <li>
              <div className="card card-body">
                <h2 className={"title2"}>Order Items</h2>
                <ul className={"list-type-none"}>
                  {cart.cartItems.map((item, index) => (
                    <li key={index}>
                      <div className="row">
                        <div>
                          <img
                            src={item.image}
                            alt={item.name}
                            className="small"
                          ></img>
                        </div>
                        <div className="">
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </div>

                        <div>
                          {item.qty} x {symbol}
                          {(rates[currency] * item.price).toFixed(2)} = {symbol}{(rates[currency] * item.price).toFixed(2)}
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
          <div className="card card-body">
            <ul className={"list-type-none"}>
              <li>
                <h2 className={"title2"}>Order Summary</h2>
              </li>
              <li>
                <div className="row">
                  <div>Items</div>

                  <div>
                    {symbol} {(rates[currency] * cart.itemsPrice).toFixed(2)}
                  </div>
                </div>
              </li>
              <li>
                <div className="row">
                  <div>Shipping</div>

                  <div>
                    {symbol}{" "}
                    {(rates[currency] * (isNaN(shippingCost[shipping_country]) ? 0 : +shippingCost[shipping_country])).toFixed(2)}
                  </div>
                </div>
              </li>

              <li>
                <div className="row">
                  <div>
                    <strong> Order Total</strong>
                  </div>
                  <div>
                    <div>
                      {symbol} {(rates[currency] * cart.totalPrice).toFixed(2)}
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <button
                  type="button"
                  onClick={placeOrderHandler}
                  className="primary block"
                  disabled={cart.cartItems.length === 0}
                >
                  Place Order
                </button>
              </li>
              {loading && <LoadingBox></LoadingBox>}
              {error && <MessageBox variant="danger">{error}</MessageBox>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
