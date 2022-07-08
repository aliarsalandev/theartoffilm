import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { addToCart, removeFromCart } from "../actions/cartActions";
import MessageBox from "../components/MessageBox";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function CartScreen(props) {
  const navigate = useNavigate();
  const params = useParams();
  const { id: productId } = params;

  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const { search } = useLocation();
  const qtyInUrl = new URLSearchParams(search).get("qty");
  const qty = qtyInUrl ? Number(qtyInUrl) : 1;

  const cart = useSelector((state) => state.cart);
  const { cartItems, error } = cart;
  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (id) => {
    // delete action
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/signin?redirect=/shipping");
  };
  return (
    <div className="flex row align-end  bg-light-dark  p-4">
      <div className="col-2">
        <h2 className={"title2 text-start mb-2"}>
          {" "}
          <span className="selection">Shopping</span> Cart
        </h2>
        {error && <MessageBox variant="danger">{error}</MessageBox>}
        {cartItems.length === 0 ? (
          <MessageBox>
            Cart is empty. <Link to="/">Go Shopping</Link>
          </MessageBox>
        ) : (
          <ul className={"list-style-none p-2"}>
            {cartItems.map((item) => (
              <li key={item.product}>
                <div className="row">
                  <div>
                    <img
                      src={item.image}
                      alt={item.name}
                      className="small"
                    ></img>
                  </div>
                  <div className="">
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                  </div>

                  <div>
                    {symbol} {(rates[currency] * item.price).toFixed(1)}
                  </div>
                  <div>
                    <button
                      type="button"
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="col-1 flex column end">
        <div className="card card-body text-end">
          <ul className={"list-style-none"}>
            <li>
              Subtotal ({cartItems.reduce((a, c) => a + c.qty, 0)} items) :{" "}
              {symbol}
              {cartItems.reduce(
                (a, c) => a + (rates[currency] * c.price).toFixed(1) * c.qty,
                0
              )}
            </li>
          </ul>
        </div>
        <button
          type="button"
          onClick={checkoutHandler}
          className="primary block"
          disabled={cartItems.length === 0}
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
