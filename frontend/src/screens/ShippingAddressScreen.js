import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from "../actions/cartActions";
import CheckoutSteps from "../components/CheckoutSteps";
import { detailsUser } from "../actions/userActions";
import data from "../data";

export default function ShippingAddressScreen(props) {
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [code, setCode] = useState("GB");

  const [address_detail, setAddressDetail] = useState({
    address: shippingAddress.address || "",
    city: shippingAddress.city || "",
    postalCode: shippingAddress.postalCode || "",
    country: shippingAddress.country || "",
  });
  const { userInfo } = useSelector((state) => state.userSignin);

  const { user } = useSelector((state) => state.userDetails);

  useEffect(() => {
    setAddressDetail({
      address: user?.address,
      city: user?.city,
      postalCode: user?.postalCode,
      country: user?.country,
    });

    const _code = data.origins.find(({ name }) => name === user?.country)?.code;
    localStorage.setItem("shipping_country", _code);

    if (_code) {
      setCode(_code);
    }

    return () => {};
  }, [user]);

  if (!userInfo) {
    navigate("/signin");
  }

  const dispatch = useDispatch();
  const submitHandler = (e) => {
    e.preventDefault();

    const { address, city, postalCode, country } = address_detail;

    dispatch(
      saveShippingAddress({
        address,
        city,
        postalCode,
        country,
      })
    );
    // navigate("/payment");
    navigate("/placeorder");
  };

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo]);

  const updateAddressDetail = (e) => {
    setAddressDetail({
      ...address_detail,
      [e.target.name]: e.target.value,
    });
  };
  return (
    <div>
      <CheckoutSteps step1 step2></CheckoutSteps>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1>Shipping Address</h1>
        </div>

        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            id="address"
            name={"address"}
            placeholder="Enter address"
            defaultValue={user?.address}
            onChange={updateAddressDetail}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="city">City</label>
          <input
            type="text"
            id="city"
            name={"city"}
            placeholder="Enter city"
            defaultValue={user?.city}
            onChange={updateAddressDetail}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="postalCode">Postal Code</label>
          <input
            type={"number"}
            id="postalCode"
            name={"postalCode"}
            placeholder="Enter postal code"
            defaultValue={user?.postalCode}
            onChange={updateAddressDetail}
            required
          ></input>
        </div>
        <div>
          <label htmlFor="country">Country</label>
          {
            <Select
              className="multi-select"
              placeholder={"Select Country of Origin"}
              defaultValue={{
                value: code,
                label: data.origins.find(({ code }) => code === user?.country)
                  ?.name,
              }}
              options={data.origins?.map((country) => ({
                value: country.code,
                label: country.name,
              }))}
              onChange={(__origin) => {
                const { value, label } = __origin;
                setAddressDetail({
                  ...address_detail,
                  country: label,
                });
                setCode(value);
                localStorage.setItem("shipping_country", value);
              }}
            />
          }
        </div>

        <div>
          <label />
          <button className="primary" type="submit">
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}
