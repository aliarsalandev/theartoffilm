import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Package from "../components/Package";
import PageLayout from "../layouts/page";
import { listSubscriptions } from "../actions/subscriptionActions";

function SubscriptionListScreen() {
  const [period, setPeriod] = React.useState("");

  const { loading, subscriptions } = useSelector(
    (state) => state.subscriptionList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSubscriptions());
    return () => {};
  }, [dispatch]);

  return (
    <PageLayout>
      <div className={"flex p-2"}>
        <div className="switcher" style={{ margin: "0 auto" }}>
          <input
            type="radio"
            name="balance"
            value="month"
            id="month"
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
            className="switcher__input switcher__input--month"
          />
          <label htmlFor="month" className="switcher__label">
            Monthly
          </label>

          <input
            type="radio"
            name="balance"
            value="year"
            id="year"
            onChange={(e) => {
              setPeriod(e.target.value);
            }}
            className="switcher__input switcher__input--year"
          />
          <label htmlFor="year" className="switcher__label">
            Yearly
          </label>

          <span className="switcher__toggle"></span>
        </div>
      </div>
      {loading ? (
        <div>... Loading</div>
      ) : (
        <div className="subscriptions flex wrap">
          {subscriptions?.map(
            ({ _id, name, image, currency, monthPrice, yearPrice, perks }) => {
              return (
                <Package
                  key={_id}
                  id={_id}
                  name={name}
                  image={image}
                  currency={currency}
                  monthPrice={monthPrice}
                  yearPrice={yearPrice}
                  perks={perks}
                  period={period}
                />
              );
            }
          )}
        </div>
      )}
    </PageLayout>
  );
}

export default SubscriptionListScreen;
