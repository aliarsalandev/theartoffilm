import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createSubscription,
  detailsSubscription,
  updateSubscription,
} from "../actions/subscriptionActions";
import Package from "../components/Package";
import PageLayout from "../layouts/page";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { SUBSCRIPTION_UPDATE_RESET } from "../constants/userConstants";

function SubscriptionEditScreen() {
  const [data, setSubscription] = React.useState({
    name: "",
    monthPrice: 0,
    yearPrice: 0,
    products: 0,
    currency: "GBP",
    image: "http://via.placeholder.com/300x300",
    perks: [],
  });
  // const [isLoading, setIsLoading] = React.useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const createdData = useSelector((state) => state.subscriptionCreate);

  const { subscription } = useSelector((state) => state.subscriptionDetails);
  const { loading: creating } = useSelector(
    (state) => state.subscriptionCreate
  );

  const {
    loading: updating,
    error: errorUpdate,
    success: successUpdate,
  } = useSelector((state) => state.subscriptionUpdate);

  const params = useParams();
  const { id: subscriptionId } = params;
  useEffect(() => {
    if (subscriptionId) {
      dispatch({ type: SUBSCRIPTION_UPDATE_RESET });
      dispatch(detailsSubscription(subscriptionId));
    }
    return () => {};
  }, [dispatch, subscriptionId]);
  useEffect(() => {
    if (subscription) {
      setSubscription({
        name: subscription.name,
        monthPrice: subscription.monthPrice,
        yearPrice: subscription.yearPrice,
        products: subscription.products,
        currency: subscription.currency,
        image: subscription.image,
        perks: subscription.perks,
      });
    }
    return () => {};
  }, [subscription]);

  useEffect(() => {
    (creating || updating) && navigate("/subscriptions");
    return () => {};
  }, [navigate, creating, updating]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (subscriptionId) {
      dispatch(updateSubscription(data, subscriptionId));
    } else {
      dispatch(createSubscription(data));
    }
  };

  const onChange = (e) => {
    if (e.target.name === "perks") {
      setSubscription({
        ...data,
        perks: e.target.value.split("\n"),
      });
    } else {
      setSubscription({ ...data, [e.target.name]: e.target.value });
    }
  };
  return (
    <PageLayout>
      <div className="subscriptions flex wrap">
        {false ? (
          <div>Loading...</div>
        ) : (
          <div className={"selection"}>Subscription Created Successfully</div>
        )}
        {updating && <div>Updating...</div>}
        {errorUpdate && <div>{errorUpdate}</div>}
        {successUpdate && <div>{successUpdate}</div>}
      </div>

      <div className="flex" style={{ marginTop: "4rem" }}>
        <div className="col col-2">
          <div className="m-2">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={data.name}
                  onChange={onChange}
                  placeholder="Name"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="monthPrice">Monthly Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="monthPrice"
                  name="monthPrice"
                  value={data.monthPrice}
                  onChange={onChange}
                  placeholder="Price Per Month"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="yearPrice">Yearly Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="yearPrice"
                  name="yearPrice"
                  value={data.yearPrice}
                  onChange={onChange}
                  placeholder="Price Per Year"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="products">Products</label>
                <input
                  type="number"
                  className="form-control"
                  id="products"
                  name="products"
                  value={data.products}
                  onChange={onChange}
                  placeholder="Total Products"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="currency">Currency</label>
                <select
                  className="form-control"
                  id="currency"
                  name={"currency"}
                  defaultValue={data.currency}
                  onChange={onChange}
                  required
                >
                  <option>USD</option>
                  <option>EUR</option>
                  <option>GBP</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="perks">Perks</label>
                <textarea
                  className="form-control"
                  id="perks"
                  name="perks"
                  value={data.perks.join("\n")}
                  rows="3"
                  onChange={onChange}
                  placeholder={"Each line is a perk"}
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary">
                {subscriptionId ? "Update" : "Create"}
              </button>
            </form>
          </div>
        </div>
        <div className="col col-2">
          <div className="subscriptions">
            <Package id={data._id} {...data} />
          </div>
        </div>
      </div>
    </PageLayout>
  );
}

export default SubscriptionEditScreen;
