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
    unreadMessages(userInfo).then((data) => {
      setUnread(data.messages);
    });

    return () => {};
  }, [userInfo]);

  // const createHandler = () => {
  //   dispatch(createProduct());
  // };
  return (
    <div className={"seller-sidebar bg-dark"} style={{ height: "100vh" }}>
      <ul className={"list-type-none"}>
        <li className={""}>
          {userInfo && (
            <Link to="/profile">
              <span className={"link"}>
                <i className={"fas fa-user"}></i> My Account Information
              </span>
            </Link>
          )}
        </li>
      </ul>

      {userInfo?.isSeller && (
        <ul className={"list-type-none"}>
          <li>
            <UploadPoster isLink={true} />
          </li>
          <li>
            <Link className={"link"} to="/posters/seller">
              <i className={"fas fa-list"}></i> Poster List
            </Link>
          </li>
          <li>
            <Link className={"link"} to="/user/subscriptions">
              <i className={"fas fa-list"}></i> My Subscriptions
            </Link>
          </li>
          <li>
            <Link className={"link"} to={`/seller/${userInfo._id}`}>
              <i className={"fas fa-images"}></i> My ShowCase
            </Link>
          </li>
        </ul>
      )}
      {userInfo?.isSeller && (
        <div className="selling-section">
          <div>
            <h3>Selling</h3>
          </div>
          <ul className="list-type-none">
            <li>
              <Link className={"link"} to="/orderlist/seller">
                <i className={"fas fa-clipboard"}></i> Customer Orders
              </Link>
            </li>
          </ul>
        </div>
      )}

      {userInfo?.isSeller && (
        <div className={"buying-section"}>
          <div>
            <h3>Buying</h3>
          </div>
          <ul className={"list-type-none"} style={{ lineHeight: "2em" }}>
            <li>
              <Link className={"link"} to="/orderhistory">
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
              <Link className={"link"} to="/dashboard">
                <i className={"fas fa-dashboard"}></i> Reports
              </Link>
            </li>
            <li>
              <Link className={"link"} to="/posters">
                <i className={"fas fa-list"}></i> All Posters
              </Link>
            </li>
            <li>
              <Link className={"link"} to="/orderlist">
                <i className={"fas fa-clipboard"}></i> Orders
                {unread.length > 0 && (
                  <i className={"fas fa-bell m-2"}>
                    <sup>{unread.length}</sup>
                  </i>
                )}
              </Link>
            </li>
            <li>
              <Link className={"link"} to="/userlist">
                <i className={"fas fa-users"} style={{ fontSize: "0.6em" }}></i>{" "}
                Users
              </Link>
            </li>
          </ul>
        </div>
      )}

      {userInfo?.isAdmin && (
        <div className="subscription-section">
          <ul>
            <li>
              <Link className={"link"} to="/subscriptions">
                <i className={"fas fa-credit-card"}></i> Subscriptions
              </Link>
            </li>
            <li>
              <Link className={"link"} to="/subscriptions/create">
                <i className={"fas fa-plus"}></i> Add Subscription
              </Link>
            </li>
            <li className={"mt-3"}>
              <Link className={"link"} to="/settings">
                <i className={"fas fa-cog"}></i> Settings
              </Link>
            </li>
          </ul>
        </div>
      )}

      {userInfo?.isSeller && (
        <div className="subscription-section">
          <ul>
            <li>
              <Link className={"link"} to="/payment">
                <i className={"fas fa-credit-card"}></i> Payment Settings
              </Link>
            </li>
          </ul>
        </div>
      )}

      <div className={"mt-3"}>
        <ul>
          <li>
            <Link className={"link"} to="#signout" onClick={signoutHandler}>
              <i className={"fas fa-arrow-right-from-bracket"}></i> Sign Out
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SellerSidebar;
