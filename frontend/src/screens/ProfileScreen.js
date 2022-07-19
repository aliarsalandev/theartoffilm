import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Axios from "axios";
import PageLayout from "../layouts/page";
import data from "../data";

export default function ProfileScreen() {
  const [shippingCost, setShippingCost] = useState({});
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address_detail, setAddressDetail] = useState({});
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
  const [logo, setLogo] = useState("");

  const uploadFileHandler = async (e, forImages = false) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append("file", file);
    try {
      const { data } = await Axios.post("/api/uploads", bodyFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${userInfo.token}`,
        },
      });
      setSeller({ ...seller, logo: data.secure_url });
      setLogo(data.secure_url);
    } catch (err) {
      dispatch({ type: "UPLOAD_FAIL", payload: err });
    }
  };

  const onChange = (e) => {
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const updateAddressDetail = (e) => {
    setAddressDetail({ ...address_detail, [e.target.name]: e.target.value });
  };

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
    let password = user.password;
    if (seller.password !== confirmPassword) {
      password = user.password;
    } else {
      password = seller.password;
    }

    dispatch(
      updateUserProfile({
        userId: user._id,
        name: seller.name,
        email: seller.email,
        password,
        ...address_detail,
        seller: {
          name: seller.collection_name,
          logo,
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
          <h2 className={"title2"}>
            {userInfo?.isAdmin ? "Admin Profile" : "My Profile"}
          </h2>
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

            <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                name={"name"}
                type="text"
                placeholder="Enter name"
                defaultValue={seller.name}
                onChange={onChange}
              ></input>
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input
                id="email"
                name={"email"}
                type="email"
                placeholder="Enter email"
                defaultValue={seller.email}
                onChange={onChange}
              ></input>
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <input
                id="password"
                name={"password"}
                type="password"
                placeholder="Enter password"
                onChange={onChange}
              ></input>
            </div>
            <div>
              <label htmlFor="confirmPassword">confirm Password</label>
              <input
                id="confirmPassword"
                name={"confirmPassword"}
                type="password"
                placeholder="Enter confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></input>
            </div>
            <hr />
            {userInfo?.isSeller && (
              <div className={"form"}>
                <div>
                  <label htmlFor="collection_name">Collection Name</label>
                  <input
                    id="collection_name"
                    name={"collection_name"}
                    type="text"
                    placeholder="Enter Collection Name"
                    defaultValue={seller.name}
                    onChange={onChange}
                  ></input>
                </div>
                <div>
                  <label htmlFor="logo">Logo</label>
                  <input
                    id="logo"
                    name={"logo"}
                    type="file"
                    placeholder="Enter Logo"
                    onChange={uploadFileHandler}
                  ></input>
                </div>
                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name={"description"}
                    type="text"
                    placeholder="Enter Description"
                    defaultValue={seller.description}
                    onChange={onChange}
                  ></textarea>
                </div>
              </div>
            )}

            {userInfo?.isSeller && (
              <>
                {" "}
                <div className="text-start">
                  <h3 className={"title3"}>Address Settings</h3>
                </div>
                <div>
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    name={"address"}
                    type="text"
                    placeholder="Enter address"
                    defaultValue={user.address}
                    onChange={updateAddressDetail}
                  ></input>
                </div>
              </>
            )}
            <div>
              <label htmlFor="city">City</label>
              <input
                id="city"
                name={"city"}
                type="text"
                placeholder="Enter city"
                defaultValue={user.city}
                onChange={updateAddressDetail}
              ></input>
            </div>

            <div>
              <label htmlFor="country">Country</label>
              <Select
                className="multi-select"
                placeholder={"Select Country of Origin"}
                defaultValue={{
                  value: user?.country ?? "GB",
                  label: data.stripe_origins.find(
                    (country) => country.code === user?.country
                  )?.name,
                }}
                options={data.stripe_origins?.map((country) => ({
                  value: country.code,
                  label: country.name,
                }))}
                onChange={(__origin) => {
                  setAddressDetail({
                    ...address_detail,
                    country: __origin.value,
                  });
                }}
              />
            </div>
            <div>
              <label htmlFor="postalCode">Zipcode</label>
              <input
                id="postalCode"
                name={"postalCode"}
                type="text"
                placeholder="Enter zipcode"
                defaultValue={user.postalCode}
                onChange={updateAddressDetail}
              ></input>
            </div>

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
