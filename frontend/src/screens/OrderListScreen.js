import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { deleteOrder, listOrders } from "../actions/orderActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import SellerSidebar from "../components/SellerSidebar";
import { ORDER_DELETE_RESET } from "../constants/orderConstants";
import { unreadMessages } from "../helpers/media";
import PageLayout from "../layouts/page";

export default function OrderListScreen(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [unread, setUnread] = React.useState([]);
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const orderList = useSelector((state) => state.orderList);
  const { loading, error, orders } = orderList;
  const orderDelete = useSelector((state) => state.orderDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = orderDelete;

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    console.log("unread messages");
    unreadMessages(userInfo).then((data) => {
      setUnread(data.messages);
    });
  }, [userInfo]);

  useEffect(() => {
    dispatch({ type: ORDER_DELETE_RESET });
    dispatch(listOrders({ seller: sellerMode ? userInfo._id : "" }));
  }, [dispatch, sellerMode, successDelete, userInfo._id]);
  const deleteHandler = (order) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteOrder(order._id));
    }
  };
  return (
    <PageLayout>
      <div className={"ml-3 col-3"}>
        <div>
          <h1 className={"title"}>Orders</h1>
          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>Shipping Cost</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders?.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <div className="flex between align-center">
                        <span>{order._id}</span>
                        {unread.find(
                          (message) => message.order === order._id
                        ) && <i className="danger fas fa-envelope"></i>}
                      </div>
                    </td>
                    <td>{order.user?.name}</td>
                    <td>{order.createdAt?.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>
                      {order.isPaid ? order.paidAt.substring(0, 10) : "No"}
                    </td>
                    <td>
                      {order.shippingPrice ? order.shippingPrice.toFixed(2) : 0}
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
                      <button
                        type="button"
                        className="small"
                        onClick={() => deleteHandler(order)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PageLayout>
  );
}
