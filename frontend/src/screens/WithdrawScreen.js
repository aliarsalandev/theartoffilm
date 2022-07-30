import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import PageLayout from "../layouts/page";
import {
  getSellerWithdraws,
  getWithdraws,
  updateWithdraw,
} from "../helpers/withdraw";
import { getSellerPaymentInfo } from "../helpers/payment";

export default function WithdrawScreen() {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [updated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [withdraws, setWithdraws] = useState([]);

  useEffect(() => {
    setLoading(true);
    if (userInfo?.isAdmin) {
      getSellerWithdraws(userInfo).then((data) => {
        setLoading(false);
        setWithdraws(data);
      });
    } else {
      getWithdraws(userInfo).then((data) => {
        setLoading(false);
        setWithdraws(data);
      });
    }
  }, [userInfo]);

  const [sellerAccountInfo, setSellerAccountInfo] = useState({});
  return (
    <PageLayout>
      {updated && <div className="alert alert-success">Settings Updated</div>}

      <div>
        <h1>Withdraw Requests</h1>
      </div>

      <div>
        {loading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <></>
        )}
        <div className={"row bg-dark"}>
          <div className={"col-3"}>
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Amount</th>
                  <th>Currency</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {withdraws?.map(
                  ({ _id, user, amount, currency, status, createdAt }) => (
                    <tr key={_id}>
                      <td>{user.name}</td>
                      <td>
                        <button onClick={() => {
                          getSellerPaymentInfo(user.email).then(({ payment_info }) => {
                            setSellerAccountInfo(payment_info?.account_info)
                          })
                        }}>
                          {user.email}
                        </button>
                      </td>
                      <td>{amount}</td>
                      <td>{currency}</td>
                      <td>{status}</td>
                      <td>{createdAt?.slice(0, 10)}</td>
                      {
                        userInfo?.isAdmin && status === "unpaid" ? (
                          <td>
                            <select
                              onChange={(e) => {
                                updateWithdraw(userInfo, e.target.value, _id).then(
                                  (data) => {
                                    console.log(data);
                                  }
                                );
                              }}
                            >
                              <option >Approve or Reject</option>
                              <option value="paid">Approve</option>
                              <option value="unpaid">Reject</option>
                            </select>

                          </td>) : (
                          <td></td>
                        )
                      }
                    </tr>
                  )
                )}
              </tbody>
            </table>
          </div>
          <div className="col bg-dark p-4">
            <table>
              <thead>
                <th>Bank Account #</th>
                <th>Routing Number</th>
                <th>Bank Account Country</th>
                <th>Paypal Email</th>

              </thead>
              <tbody>
                <tr>
                  {/* const { account_number, country, currency, paypal_email, routing_number } = payment_info?.account_info; */}

                  <td>
                    {sellerAccountInfo?.account_number}
                  </td>
                  <td>
                    {sellerAccountInfo?.routing_number}
                  </td>
                  <td>
                    {sellerAccountInfo?.country}
                  </td>
                  <td>
                    {sellerAccountInfo?.paypal_email}

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </PageLayout>
  );
}
