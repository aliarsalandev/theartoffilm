import React from "react";
import SearchBox from "./SearchBox";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
function Header() {
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.userSignin);
  return (
    <header className="row">
      <div>
        <Link className="brand" to="/">
          theartoffilms
        </Link>
      </div>

      <div className={"row"}>
        <div>
          <Link to="/cart">
            <i className="fa-solid fa-cart-shopping"></i>
            {cartItems.length > 0 && (
              <span className="badge">{cartItems.length}</span>
            )}
          </Link>

          {userInfo && <Link to="/profile">My Account</Link>}
          {userInfo?.isSeller && (
            <Link to={`/seller/${userInfo._id}`}>My ShowCase</Link>
          )}
          <Link to="/sellers">Collectors</Link>

          {!userInfo && <Link to="/signin">Sign In</Link>}

          {/* <button
       type="button"
       className="open-sidebar"
       onClick={() => setSidebarIsOpen(true)}
     >
       <i className="fa-solid fa-bars"></i>{' '}
     </button> */}
        </div>
        <SearchBox />
      </div>
    </header>
  );
}

export default Header;
