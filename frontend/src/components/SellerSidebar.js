import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
function SellerSidebar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };
  // const createHandler = () => {
  //   dispatch(createProduct());
  // };
  return (
    <div className={"seller-sidebar"}>
      {userInfo && (
        <div>
          <h4>
            <Link to="/profile">My Profile Profile</Link>
          </h4>
          {/* <button className="link" onClick={createHandler}>
            Upload Posters
          </button> */}
        </div>
      )}
      {userInfo?.isAdmin && (
        <div className="admin-section">
          <div>
            <h3>Admin Controls</h3>
          </div>
          <ul className="">
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/productlist">All Posters</Link>
            </li>
            <li>
              <Link to="/orderlist">All Orders</Link>
            </li>
            <li>
              <Link to="/userlist">All Users</Link>
            </li>
            <li>
              <Link to="/support">User Enqueries</Link>
            </li>
          </ul>
        </div>
      )}
      {userInfo?.isSeller && (
        <div className="selling-section">
          <div>
            <h3>Selling</h3>
          </div>
          <ul className="">
            <li>
              <Link to="/productlist/seller">My Posters</Link>
            </li>
            <li>
              <Link to="/orderlist/seller">Customer Orders</Link>
            </li>
          </ul>
        </div>
      )}
      {userInfo && (
        <div className={"buying-section"}>
          <div>
            <h3>Buying</h3>
          </div>
          <ul>
            <li>
              <Link to="/orderhistory">Purchase Orders</Link>
            </li>
          </ul>
        </div>
      )}
      <hr />
      <div className={"mt-3"}>
        <Link to="#signout" onClick={signoutHandler}>
          Sign Out
        </Link>
      </div>
    </div>
  );
}

export default SellerSidebar;
