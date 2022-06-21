import React, { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { CurrencyRates } from "../helpers/payment";
import "./css/header.css";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [rates, setRates] = React.useState({
    GBP: 1,
    USD: 1.22255,
    EUR: 1.164851,
  });

  const [selected_currency, setCurrency] = React.useState({});

  const getCurrencyRates = useCallback(() => {
    CurrencyRates({
      onResult: (result) => {
        setRates({
          ...rates,
          ...result.rates,
        });
      },
      onError: (error) => {
        console.log("41", error);
      },
    });
  }, []);

  useEffect(() => {
    console.log("SubscriptionEditScreen useEffect");
    setCurrency(JSON.parse(localStorage.getItem("currency")) ?? {});
    getCurrencyRates();
    return () => {};
  }, []);

  return (
    <header className="row header">
      <div>
        <Link className="brand" to="/">
          <img height={120} src={"/images/logo.png"} alt={"theartoffilms"} />
        </Link>
      </div>
      <div className={"row"}>
        <div className={"row"}>
          <div>
            <Link to="/">Home</Link>
            <Link to="/faq">FAQs</Link>
            <Link to="/sellers">Collectors</Link>
            <Link to="/pricing">Pricing</Link>

            {userInfo?.isSeller && (
              <Link to={`/seller/${userInfo._id}`}>My ShowCase</Link>
            )}

            {userInfo && <Link to="/profile">My Account</Link>}

            {!userInfo && <Link to="/signin">Sign In</Link>}
          </div>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>

          <div className="flex" style={{ justifyContent: "end" }}>
            <select
              className={"select"}
              onChange={(e) => {
                setCurrency(e.target.value);
                localStorage.setItem(
                  "currency",
                  JSON.stringify({
                    currency: e.target.value,
                    rates: rates,
                  })
                );

                window.location.reload();
              }}
            >
              <option
                selected={
                  selected_currency.currency === "GBP" ? "selected" : ""
                }
                value="GBP"
              >
                GBP
              </option>
              <option
                selected={
                  selected_currency.currency === "USD" ? "selected" : ""
                }
                value="USD"
              >
                USD
              </option>
              <option
                selected={
                  selected_currency.currency === "EUR" ? "selected" : ""
                }
                value="EUR"
              >
                EUR
              </option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
