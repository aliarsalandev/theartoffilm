import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsUser, updateUserProfile } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { USER_UPDATE_PROFILE_RESET } from "../constants/userConstants";
import Axios from "axios";
import PageLayout from "../layouts/page";

export default function ProfileScreen() {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [seller, setSeller] = useState({
    name: "",
    email: "",
    password: "",
    logo: "",
    collection_name: "",
    stripe_account_id: "",
    description: "",
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
      console.log("image upload data", data);
    } catch (err) {
      console.log(err);
      dispatch({ type: "UPLOAD_FAIL", payload: err });
    }
  };

  const onChange = (e) => {
    console.log({
      ...seller,
      [e.target.name]: e.target.value,
    });
    setSeller({ ...seller, [e.target.name]: e.target.value });
  };

  const dispatch = useDispatch();
  useEffect(() => {
    const { _id } = userInfo;
    if (!user) {
      dispatch({ type: USER_UPDATE_PROFILE_RESET });
      dispatch(detailsUser(_id));
    }
  }, [dispatch, user, userInfo]);

  const updateSeller = (user) => {
    const { name, email, password, seller } = user;
    const {
      logo,
      name: collection_name,
      stripe_account_id,
      description,
    } = seller;
    setSeller({
      ...seller,
      name,
      email,
      password,
      logo,
      collection_name,
      stripe_account_id,
      description,
    });
  };
  useEffect(() => {
    if (user) {
      updateSeller(user);
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
        seller: {
          name: seller.collection_name,
          logo,
          description: seller.description,
          stripe_account_id: seller.stripe_account_id,
        },
      })
    );
  };
  return (
    <PageLayout>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className={"title"}>
            {userInfo?.isAdmin ? "Admin Profile" : "My Profile"}
          </h1>
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
            <div>
              <label htmlFor="stripe_account_id">Stripe Account Id</label>
              <input
                id="stripe_account_id"
                name={"stripe_account_id"}
                type="text"
                placeholder="Enter Stripe Account Id"
                defaultValue={seller.stripe_account_id}
                onChange={onChange}
              ></input>
            </div>
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
