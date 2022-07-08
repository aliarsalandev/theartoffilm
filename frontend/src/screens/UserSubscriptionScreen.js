// This example shows you how to set up React Stripe.js and use Elements.
// Learn how to accept a payment using the official Stripe docs.
// https://www.stripe.com/docs/payments/integration-builder

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { userSubscription } from "../helpers/payment";
import PageLayout from "../layouts/page";
import Package from "../components/Package";

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
        <Package
          id={subscription._id}
          name={subscription.name}
          enabled={false}
          image={subscription.image}
          currency={subscription.currency}
          monthPrice={subscription.monthPrice}
          yearPrice={subscription.yearPrice}
          perks={subscription.perks}
          period={subscription.period}
        />
      </div>
    </PageLayout>
  );
};
