import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signout } from "../actions/userActions";
import UploadPoster from "./UploadPoster";
import { unreadMessages } from "../helpers/media";
function SellerSidebar() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [unread, setUnread] = useState([]);

  const dispatch = useDispatch();
  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    console.log("unread messages");
    unreadMessages(userInfo).then((data) => {
      setUnread(data.messages);
    });

    return () => {};
  }, [userInfo]);

  // const createHandler = () => {
  //   dispatch(createProduct());
  // };
  return (
    <div className={"seller-sidebar"}>
      <ul>
        <li className={""}>
          {userInfo && (
            <Link to="/profile">
              <i className={"fas fa-user"}></i> My Account Information
            </Link>
          )}
        </li>
        <li>
          <UploadPoster isLink={true} />
        </li>
        <li>
          <Link to="/productlist/seller">
            <i className={"fas fa-list"}></i> Poster List
          </Link>
        </li>
        <li>
          <Link to="/user/subscriptions">
            <i className={"fas fa-list"}></i> My Subscriptions
          </Link>
        </li>
        <li>
          <Link to={`/seller/${userInfo._id}`}>
            <i className={"fas fa-images"}></i> My ShowCase
          </Link>
        </li>
      </ul>
      {userInfo?.isSeller && (
        <div className="selling-section">
          <div>
            <h3>Selling</h3>
          </div>
          <ul className="">
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

      {userInfo?.isAdmin && (
        <div className="admin-section">
          <div>
            <h3>Admin Controls</h3>
          </div>
          <ul className="">
            <li>
              <Link to="/dashboard">
                <i className={"fas fa-dashboard"}></i> Reports
              </Link>
            </li>
            <li>
              <Link to="/productlist">
                <i className={"fas fa-list"}></i> All Posters
              </Link>
            </li>
            <li>
              <Link to="/orderlist">
                <i className={"fas fa-clipboard"}></i> Orders
                {unread.length > 0 && (
                  <i className={"fas fa-bell m-2"}>
                    <sup>{unread.length}</sup>
                  </i>
                )}
              </Link>
            </li>
            <li>
              <Link to="/userlist">
                <i className={"fas fa-users"} style={{ fontSize: "0.6em" }}></i>{" "}
                Users
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

      {userInfo?.isAdmin && (
        <div className="subscription-section">
          <div>
            <h3>Admin Controls</h3>
          </div>
          <ul>
            <li>
              <Link to="/subscriptions">
                <i className={"fas fa-credit-card"}></i> Subscriptions
              </Link>
            </li>
            <li>
              <Link to="/subscriptions/create">
                <i className={"fas fa-plus"}></i> Add Subscription
              </Link>
            </li>
            <li className={"mt-3"}>
              <Link to="/settings">
                <i className={"fas fa-cog"}></i> Settings
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
