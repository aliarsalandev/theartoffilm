import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getPaymentInfo, updatePaymentInfo } from "../helpers/payment";
import PageLayout from "../layouts/page";
import Select from "react-select";
import data from "../data";

export default function PaymentScreen() {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const [updated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [details_submitted, setDetails_submitted] = useState(false);

  const [info, setInfo] = useState({
    routing_number: "",
    account_number: "",
    paypal_email: "",
    country: "GB",
    currency: "GBP",
  });

  useEffect(() => {
    getPaymentInfo(userInfo).then(({ payment_info }) => {
      console.log(payment_info);

      const { account_info } = payment_info;
      setDetails_submitted(account_info.details_submitted);
      if (!account_info.details_submitted) {
        console.log(account_info);
        if (account_info.account_number || account_info.routing_number) {
          setInfo(account_info);
        }
      } else {
        setInfo(account_info);
      }
    });
  }, [userInfo]);

  const updateInfo = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const submitPaymentInfo = (e) => {
    e.preventDefault();
    setLoading(true);
    const { routing_number, account_number, country, currency, paypal_email } = info;

    const paymentInfo = {
      bank_account: {
        routing_number,
        account_number,
        country,
        currency,
        paypal_email
      },
    };
    updatePaymentInfo(paymentInfo, userInfo).then((data) => {
      setLoading(false);

      console.log(data);
    });
  };
  return (
    <PageLayout>
      {updated && <div className="alert alert-success">Settings Updated</div>}

      <form className="form" onSubmit={submitPaymentInfo}>
        <div>
          <h1>Settings</h1>
        </div>

        <div>
          <label htmlFor="country">Country</label>
          <Select
            className="multi-select"
            placeholder={"Select Country of Origin"}
            defaultValue={{
              value: info?.country,
              label: data.stripe_origins.find(
                (country) => country.code === info.country
              ).name,
            }}
            options={data.stripe_origins?.map((country) => ({
              value: country.code,
              label: country.name,
            }))}
            onChange={(__origin) => {
              setInfo({ ...info, country: __origin.value });
            }}
          />
        </div>

        <div>
          <label htmlFor="currency">Currency</label>
          <input
            id="currency"
            name={"currency"}
            defaultValue={info?.currency}
            type="text"
            onChange={updateInfo}
          />
        </div>


        <div>
          <label htmlFor="name">Paypal Email</label>
          <input
            id="paypal_email"
            name={"paypal_email"}
            defaultValue={info?.paypal_email}
            type="text"
            onChange={updateInfo}
          />
        </div>


        <div>
          <label htmlFor="name">Routing Number</label>
          <input
            id="routing_number"
            name={"routing_number"}
            defaultValue={info?.routing_number}
            // pattern="\s*(\d{9})(?:[^\d]|$)"
            type="text"
            onChange={updateInfo}
          />
        </div>

        <div>
          <label htmlFor="name">Account Number</label>
          <input
            id="account_number"
            name={"account_number"}
            defaultValue={info?.account_number}
            type="text"
            // pattern={"\\w{17}"}
            onChange={updateInfo}
          />
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner-border text-primary" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div>
            <p className={"text-accent"}>Payment Information Updated</p>
          </div>
        )}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </PageLayout>
  );
}
