import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import UploadPoster from "./UploadPoster";
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
            <Link to="/profile">
              <i className={"fas fa-user"}></i> My Profile Profile{" "}
            </Link>
          </h4>
        </div>
      )}
      <ul>
        <li>
          <UploadPoster isLink={true} />
        </li>
        <li>
          <Link to={`/seller/${userInfo._id}`}>
            {" "}
            <i className={"fas fa-images"}></i> My ShowCase
          </Link>
        </li>
      </ul>
      {userInfo?.isAdmin && (
        <div className="admin-section">
          <div>
            <h3>Admin Controls</h3>
          </div>
          <ul className="">
            <li>
              <Link to="/dashboard">
                <i className={"fas fa-dashboard"}></i> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/productlist">
                <i className={"fas fa-list"}></i> All Posters
              </Link>
            </li>
            <li>
              <Link to="/orderlist">
                <i className={"fas fa-clipboard"}></i> All Orders
              </Link>
            </li>
            <li>
              <Link to="/userlist">
                <i className={"fas fa-users"}></i> All Users
              </Link>
            </li>
            <li>
              <Link to="/support">
                <i className={"fas fa-headset"}></i> User Enqueries
              </Link>
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
              <Link to="/productlist/seller">
                <i className={"fas fa-list"}></i> My Posters
              </Link>
            </li>
            <li>
              <Link to="/orderlist/seller">
                <i className={"fas fa-clipboard"}></i> Customer Orders
              </Link>
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
              <Link to="/orderhistory">
                <i className={"fas fa-clipboard"}></i> Purchase Orders
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className={"mt-3"}>
        <Link to="#signout" onClick={signoutHandler}>
          <i className={"fas fa-arrow-right-from-bracket"}></i> Sign Out
        </Link>
      </div>
    </div>
  );
}

export default SellerSidebar;
