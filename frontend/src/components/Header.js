import React, { useCallback, useEffect } from "react";
import { isMobile } from "react-device-detect";
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
    JPY: 164.0,
  });

  const [selected_currency, setCurrency] = React.useState({});
  const updateRates = useCallback((_rates) => {
    setRates((prevRates) => ({ ...prevRates, ..._rates }));
  }, []);

  useEffect(() => {
    console.log("SubscriptionEditScreen useEffect");
    setCurrency(JSON.parse(localStorage.getItem("currency")) ?? {});
    CurrencyRates({
      onResult: (result) => {
        const rates = JSON.parse(result).rates;
        updateRates((prevRates) => ({ ...prevRates, ...rates }));
      },
      onError: (error) => {
        console.log("41", error);
      },
    });
    return () => {};
  }, [updateRates]);

  return (
    <header className="flex column header bg-dark">
      <div className={"flex row bg-light-dark plr-2"}>
        <div className={"row col-6"}>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/Henry4film/"
              target={"_blank"}
              rel="noreferrer"
            >
              <i className="fa-brands fa-facebook"></i>
            </a>

            <a
              href="https://www.instagram.com/the_artoffilm/?utm_medium=copy_link"
              target={"_blank"}
              rel="noreferrer"
            >
              <i className="fa-brands fa-instagram"></i>
            </a>

            <a
              href="https://www.youtube.com/channel/UCYDDoM6EPQryVyCzW9G-Ryg"
              target={"_blank"}
              rel="noreferrer"
            >
              <i className="fa-brands fa-youtube"></i>
            </a>
          </div>
        </div>
        <div className={"row col-6"}>
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
              <option
                selected={
                  selected_currency.currency === "JPY" ? "selected" : ""
                }
                value="JPY"
              >
                JPY
              </option>
            </select>
          </div>

          {userInfo && (
            <Link className={"ml-2"} to="/profile">
              {userInfo?.isAdmin ? "Admin Account" : "My Account"}
            </Link>
          )}
        </div>
      </div>
      <div className={`pr-2 flex ${isMobile ? "column" : ""}`}>
        <div className={`flex ${isMobile ? "column center w-100" : "row"} `}>
          <Link className="flex center brand" to="/">
            <img
              width={isMobile ? 135 : 270}
              src={"/images/logo.png"}
              alt={"theartoffilms"}
            />
          </Link>
        </div>
        <div className={"flex row center w-100"}>
          <Link to="/">Home</Link>
          <Link to="/sellers">Showcase</Link>
          <Link to={"/search/name"}>Shop</Link>
          <Link to="/faq">FAQ</Link>
          <Link to="/pricing">Subscriptions</Link>
          <Link to="/blog-page">Why Film Poster</Link>
          {userInfo?.isSeller ? (
            <Link to={`/seller/${userInfo._id}`}>My ShowCase</Link>
          ) : (
            <></>
          )}

          {!userInfo && <Link to="/signin">Sign In</Link>}
        </div>
        <div className={"flex row center"}>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;
