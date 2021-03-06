import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { listOrderMine } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SellerSidebar from "../components/SellerSidebar";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function OrderHistoryScreen(props) {
  const navigate = useNavigate();
  const orderMineList = useSelector((state) => state.orderMineList);
  const { loading, error, orders } = orderMineList;
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listOrderMine());
  }, [dispatch]);
  return (
    <div className={"row top"}>
      <div className="col-1">
        <SellerSidebar />
      </div>
      <div className={"ml-3 col-3"}>
        <div>
          <h1 className={"title"}>Order History</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>
                      {symbol} {(rates[currency] * order.totalPrice).toFixed(2)}{" "}
                    </td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.isDelivered
                        ? order.deliveredAt?.substring(0, 10)
                        : "No"}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          navigate(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
