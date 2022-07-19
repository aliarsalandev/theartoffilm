import React, { useEffect, useRef, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import PageLayout from "../layouts/page";
import data from "../data";

export default function ShippingDetailsScreen() {
  const shippingCostRef = useRef("");
  const [shippingCost, setShippingCost] = useState({});
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    password: "",
    logo: "",
    collection_name: "",
    stripe_account_id: "",
    description: "",
    shipping_cost: {},
  });

  const { userInfo } = useSelector((state) => state.userSignin);
  const { loading, error, user } = useSelector((state) => state.userDetails);
  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const {
    success: successUpdate,
    error: errorUpdate,
    loading: loadingUpdate,
  } = userUpdateProfile;

  const dispatch = useDispatch();
  useEffect(() => {
    const { _id } = userInfo;
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(_id));
    }
  }, [dispatch, user, userInfo]);

  useEffect(() => {
    if (user) {
      const { name, email, password, seller: _seller } = user;
      const {
        logo,
        name: collection_name,
        shipping_cost,
        stripe_account_id,
        description,
      } = _seller;
      setSeller((prevState) => ({
        ...prevState,
        name,
        email,
        password,
        logo,
        collection_name,
        stripe_account_id,
        shipping_cost,
        description,
      }));

      setShippingCost((prevState) => ({
        ...prevState,
        ...shipping_cost,
      }));
    }

    return () => {};
  }, [user]);

  const submitHandler = (e) => {
    e.preventDefault();

    const { seller: _seller } = user;

    dispatch(
      updateUserProfile({
        userId: user._id,
        name: seller.name,
        email: seller.email,

        seller: {
          ..._seller,
          logo: _seller.logo,
          name: seller.collection_name,
          description: seller.description,
          shipping_cost: shippingCost,
          stripe_account_id: seller.stripe_account_id,
        },
      })
    );
  };

  return (
    <PageLayout>
      <form className="form p-4" onSubmit={submitHandler}>
        <div>
          <h2 className={"title2"}>Shipping Details</h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {loadingUpdate && <LoadingBox></LoadingBox>}
            {errorUpdate && (
              <MessageBox variant="danger">{errorUpdate}</MessageBox>
            )}
            {successUpdate && (
              <MessageBox variant="success">
                Profile Updated Successfully
              </MessageBox>
            )}

            {userInfo?.isSeller && (
              <>
                <div>
                  <label htmlFor="shipping_cost title3">Shipping Cost</label>

                  <div className={"flex row"}>
                    <input
                      id="shipping_cost"
                      ref={shippingCostRef}
                      type="number"
                      placeholder="Enter Shipping Cost"
                    ></input>
                    <div>
                      <Select
                        className="multi-select"
                        placeholder={"Select Country of Origin"}
                        defaultValue={{
                          value: "GB",
                          label: "United Kingdom",
                        }}
                        options={data.origins?.map((country) => ({
                          value: country.code,
                          label: country.name,
                        }))}
                        onChange={(__origin) => {
                          const origin = __origin.value;
                          const value = shippingCostRef.current.value;
                          setShippingCost({
                            ...shippingCost,
                            [origin]: value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex mtb-2">
                    {Object.keys(shippingCost)?.map((key, index) => {
                      return (
                        <div key={index} className={"mr-2 chip p-2"}>
                          <span>
                            {
                              data.origins.find(
                                (country) => country.code === key
                              )["name"]
                            }{" "}
                            : {shippingCost[key]}
                          </span>
                          <i
                            className="ml-2 fas fa-times pointer"
                            onClick={() => {
                              delete shippingCost[key];
                              setShippingCost({
                                ...shippingCost,
                              });
                            }}
                          ></i>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            <div>
              <label />
              <button className="primary" type="submit">
                Update
              </button>
            </div>
          </>
        )}
      </form>
    </PageLayout>
  );
}
