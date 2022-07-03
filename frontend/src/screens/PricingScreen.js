import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Package from "../components/Package";
import { listSubscriptions } from "../actions/subscriptionActions";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import SectionCard from "../components/SectionCard";
import FAQScreen from "./FAQScreen";
import { useCurrency } from "../hooks/currencyHooks";

function PricingScreen() {
  const { currency, rates } = useCurrency();

  const [period, setPeriod] = React.useState("month");

  const { loading, subscriptions } = useSelector(
    (state) => state.subscriptionList
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSubscriptions());
    return () => {};
  }, [dispatch]);

  return (
    <NoSideBarLayout>
      <div>
        <div className="p-2">
          <div className={"flex center"}>
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
            <div>
              <div>... Loading</div>
            </div>
          ) : (
            <div
              className="subscriptions flex wrap"
              style={{ justifyContent: "center" }}
            >
              {subscriptions?.map(
                ({
                  _id,
                  name,
                  image,
                  currency: _currency,
                  monthPrice,
                  yearPrice,
                  perks,
                }) => {
                  return (
                    <Package
                      key={_id}
                      id={_id}
                      name={name}
                      image={image}
                      currency={currency ?? _currency}
                      monthPrice={(
                        rates[currency ?? _currency] * monthPrice
                      ).toFixed(1)}
                      yearPrice={(
                        rates[currency ?? _currency] * yearPrice
                      ).toFixed(1)}
                      perks={perks}
                      period={period}
                    />
                  );
                }
              )}
            </div>
          )}
        </div>
        <div className="page-section">
          <SectionCard
            before={"Showcase"}
            title={"your Movie Posters"}
            text={`Manage and showcase your movie collection. Once you have
                  subscribed to The Art of Film you will have access to a
                  minimum of 500 blank template pages with dropdown menus to
                  populate with your own collection information. Choose the
                  format, country of issue, condition, year of release, cast,
                  and crew, etc. You can then choose to keep movie posters in
                  your own private collection and/or you can choose to sell
                  posters through our Movie Poster Shop.`}
            image={"/images/34618045.jpg"}
            linkText={"Contact Us"}
            link={"/contact"}
          />
        </div>
        <FAQScreen header={false} />
      </div>
    </NoSideBarLayout>
  );
}

export default PricingScreen;
