import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, signout } from "../actions/userActions";
import UploadPoster from "./UploadPoster";
import { unreadMessages } from "../helpers/media";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";
import { stripeBalance, withdrawStripeBalance } from "../helpers/payment";
import { requestAWithdrawal } from "../helpers/withdraw";
function SellerSidebar() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const dispatch = useDispatch();
  const [unread, setUnread] = useState([]);
  const { user } = useSelector((state) => state.userDetails);
  const [balance, setBalance] = useState();
  const [, setPayout] = useState();
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (user?.seller?.stripe_account_id) {
      stripeBalance(userInfo, user?.seller?.stripe_account_id).then((data) => {
        setBalance(data);
      });
    }
  }, [user, userInfo]);

  const withdraw = () => {
    const amount = filterNAN(
      rates[currency] *
      (user?.seller?.balance)
    );
    requestAWithdrawal(userInfo, amount, symbol).then((data) => {
      alert("Withdrawal request sent");
      console.log(data);
    });
  };

  const signoutHandler = () => {
    dispatch(signout());
  };

  useEffect(() => {
    unreadMessages(userInfo).then((data) => {
      setUnread(data.messages);
    });

    return () => { };
  }, [userInfo]);

  const filterNAN = (value) => {
    return isNaN(value) ? 0 : value;
  };
  // const createHandler = () => {
  //   dispatch(createProduct());
  // };
  return (
    <div className={"seller-sidebar bg-dark"} style={{ height: "100vh" }}>
      <ul className={"list-type-none"}>
        {userInfo?.isSeller && (
          <li className={"flex flex-column between link bebas"}>

            <div>
              <div className={"bebas"}>Available</div>
              <div className={"bebas"}>
                {symbol}{" "}
                {filterNAN(
                  rates[currency] *
                  (user?.seller?.balance)
                )}
              </div>
            </div>

            {/* {balance?.available.reduce((pv, cv) => pv + +cv.amount, 0) > 0 && ( */}
            {
              user?.seller?.balance > 0 ? <button className={"btn"} onClick={withdraw}>
                Withdraw
              </button> : <></>
            }
            {/* )} */}
          </li>
        )}
        <li className={""}>
          {userInfo && (
            <Link to="/profile">
              <span className={"link"}>
                <i className={"fas fa-user"}></i> My Account
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
      <div className={"buying-section"}>
        <div>
          <h3>Settings</h3>
        </div>
      </div>
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
            <li>
              <Link className={"link"} to="/withdraw-requests">
                <i className={"fas fa-credit-card"}></i> Withdraw Requests
              </Link>
            </li>
          </ul>
        </div>
      )}

      {userInfo?.isAdmin && (
        <div className="subscription-section">
          <ul>
            <li>
              <Link className={"link"} to="/withdraw-requests">
                <i className={"fas fa-credit-card"}></i> Withdraw Requests
              </Link>
            </li>
          </ul>
        </div>
      )}
      {userInfo?.isSeller && (
        <div className="subscription-section">
          <ul>
            <li>
              <Link className={"link"} to="/shipment-settings">
                <i className="fa-solid fa-truck"></i> Shipment Settings
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
