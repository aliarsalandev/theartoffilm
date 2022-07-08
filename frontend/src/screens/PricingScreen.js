import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Package from "../components/Package";
import { listSubscriptions } from "../actions/subscriptionActions";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import FAQScreen from "./FAQScreen";
import { useCurrency } from "../hooks/currencyHooks";
import HeroSection from "../sections/HeroSection";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
function ShowCaseCard({
  before,
  title,
  text,
  link,
  linkText,
  image,
  reverse = false,
}) {
  return (
    <div className={`flex between ${reverse ? "row-reverse" : ""} mtb-2`}>
      <div className={`col-md-6 col-xs-12 ${isMobile ? "" : "plr-2"}`}>
        <h2 className={"text-start"}>
          <span className={"selection"}>{before}</span> {title}
        </h2>
        <p>{text}</p>
        <br />
        <br />
        <Link to={link} className="button primary">
          {linkText}
        </Link>
      </div>
      <div className={`col row end top`}>
        <img
          src={image}
          alt=""
          className={`img ${isMobile ? "w-100" : "w-80"}`}
        />
      </div>
    </div>
  );
}

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
      <HeroSection
        heading={"SUBSCRIPTIONS"}
        heading2={"HOME / SUBSCRIPTIONS"}
        showSearch={false}
        image={"/images/Optimized-AoF-Banner-Raw.jpg"}
      />

      <div>
        <div className="p-2" style={{ padding: "4em 0" }}>
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

        <FAQScreen showSubscriptionFAQs={true} header={false} />

        <div className="ptb-2 container">
          <ShowCaseCard
            before={"Showcase"}
            title={"your Movie Posters"}
            text={
              "Manage and showcase your movie collection. Once you have subscribed to The Art of Film you will have access to a minimum of 500 blank template pages with dropdown menus to populate with your own collection information. Choose the format, country of issue, condition, year of release, cast, and crew, etc. You can then choose to keep movie posters in your own private collection and/or you can choose to sell posters through our Movie Poster Shop."
            }
            image={"/images/1512225-1024x576.jpg"}
            link={"/contact"}
            linkText={"Contact Us"}
          />
        </div>
      </div>
    </NoSideBarLayout>
  );
}

export default PricingScreen;
