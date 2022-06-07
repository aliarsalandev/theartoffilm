import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "./css/header.css";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
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
            <Link to="/sellers">Collectors</Link>

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
        </div>
      </div>
    </header>
  );
}

export default Header;
