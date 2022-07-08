import React from "react";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { processCheckout } from "../helpers/payment";
import { useState } from "react";
function Package({
  id,
  name,
  image,
  period,
  monthPrice,
  yearPrice,
  currency,
  perks,
}) {
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const [loading, setLoading] = useState(false);

  return (
    <section className="card premium">
      <article className="bg-accent w-100 text-center">
        <h2 className="name title3 text-dark">{name}</h2>
      </article>

      <div className="p-2">
        <div className="payment">
          <h3 className="price">
            {currency}{" "}
            {period === "month" ? `${monthPrice}/Month` : `${yearPrice}/Year`}
          </h3>
          <p className="billed-other">
            {/* <strong>Billed annually</strong> or $24 monthly */}
          </p>
        </div>

        <div className="perks">
          <ul className={"list-style-none"}>
            {perks?.map((perk, index) => (
              <li key={index}>
                <i className={"fa fa-check"}></i> {perk}
              </li>
            ))}
          </ul>
        </div>

        {userInfo && (
          <div className="button">
            {loading === true ? (
              <div>
                <i className="fa fa-spinner fa-spin">Loading....</i>
              </div>
            ) : (
              <button
                className="button-free s-b"
                title={"Get Started"}
                onClick={(e) => {
                  setLoading(true);
                  processCheckout(
                    currency,
                    name,
                    period === "month" ? `${monthPrice}0` : `${yearPrice}0`,
                    period,
                    1,
                    "subscription",
                    id
                  ).then((data) => {
                    // console.log(JSON.stringify(data));
                    window.open(data.session.url, "_blank");
                  });
                  setLoading(false);
                }}
              >
                Get started
              </button>
            )}
          </div>
        )}
      </div>
      <br />
      {userInfo?.isAdmin && (
        <Link to={`/subscriptions/${id}/edit`} className="button-free s-b">
          Edit
        </Link>
      )}
    </section>
  );
}

Package.defaultProps = {
  id: "-01",
  name: "FREE TRIAL",
  period: "monthly",
  pricePerMonth: "10",
  pricePerYear: "100",
  currency: "USD",
  perks: [
    "10 users",
    "Unlimited projects",
    "Download advance prototypes",
    "24/7 customer support",
  ],
  image: "https://via.placeholder.com/300x200",
};
Package.prototype = {
  id: propTypes.string,
  name: propTypes.string,
  pricePerMonth: propTypes.number,
  pricePerYear: propTypes.number,
  image: propTypes.string,
  currency: propTypes.string,
  perks: propTypes.array,
};

export default Package;
