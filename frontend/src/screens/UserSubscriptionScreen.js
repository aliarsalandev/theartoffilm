// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSubscription } from "../helpers/payment";
import PageLayout from "../layouts/page";
export const UserSubscriptionScreen = () => {
  const { userInfo } = useSelector((state) => state.userSignin);
  const [subscription, setSubscription] = React.useState({
    _id: "",
    name: "",
    image: "",
    currency: "",
    products: 0,
    monthPrice: 0,
    yearPrice: 0,
    perks: [],
    createdAt: "",
    period: "",
  });
  // const { name, image, currency, products, monthPrice, yearPrice, perks } =
  //   userInfo;
  useEffect(() => {
    userSubscription(userInfo._id).then((data) => {
      console.log(data);
      const { subscription, period } = data;
      setSubscription({
        ...subscription,
        period,
      });
    });
    return () => {};
  }, [userInfo._id]);

  return (
    <PageLayout>
      <div
        className="AppWrapper"
        style={{ maxWidth: "320px", width: "320px", margin: "0 auto" }}
      >
        <section className="card premium p-2">
          <article className="title">
            <h1 className="name">{subscription.name}</h1>
            <p className="about">{/* <img src={image} alt={"Package"} /> */}</p>
          </article>

          <div className="payment">
            <h3 className="price">
              {subscription.currency}
              GBP{" "}
              {subscription.period === "month"
                ? subscription.monthPrice
                : subscription.yearPrice}
            </h3>
            <p className="billed-other">
              {/* <strong>Billed annually</strong> or $24 monthly */}
            </p>
          </div>

          <div className="perks">
            <ul>
              <li>
                <span className="bold">Products</span>:
                <strong> {subscription.products}</strong>
              </li>
              {subscription.perks?.map((perk, index) => (
                <li key={index}>
                  <i className={"fa fa-check"}></i> {perk}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};
