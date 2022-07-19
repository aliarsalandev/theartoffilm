import React, { useEffect, useState } from "react";
import Select from "react-select";

import { useDispatch, useSelector } from "react-redux";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Axios from "axios";
import PageLayout from "../layouts/page";
import data from "../data";
import {
  createAdvertise,
  processAdvertiseCheckout,
} from "../helpers/advertise";

export default function AdvertiseScreen() {
  const dispatch = useDispatch();

  const [advertisement, setAdvertisement] = useState({
    title: "",
    link: "",
    image: "",
    type: "",
  });

  const { userInfo } = useSelector((state) => state.userSignin);
  const { user } = useSelector((state) => state.userDetails);

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadFileHandler = async (e, forImages = false) => {
    setUploading(true);
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
      setUploading(false);
      setAdvertisement({ ...advertisement, image: data.secure_url });
    } catch (err) {
      setError(err);
      dispatch({ type: "UPLOAD_FAIL", payload: err });
    }
  };

  useEffect(() => {
    const { _id } = userInfo;
    if (!user) {
      dispatch(detailsUser(_id));
    }
  }, [dispatch, user, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    createAdvertise(userInfo, advertisement)
      .then((data) => {
        setSuccess(true);
        processAdvertiseCheckout(advertisement, userInfo?._id).then((data) => {
          window.open(data.session.url, "_blank");
        });
      })
      .catch((err) => {
        setError(err);
      });
  };

  const onChange = (e) => {
    setAdvertisement({ ...advertisement, [e.target.name]: e.target.value });
  };

  return (
    <PageLayout>
      {userInfo && (
        <form className="form p-4" onSubmit={submitHandler}>
          <div className={"flex flex-column align-center"}>
            <i
              style={{ fontSize: "4rem" }}
              className="fa-solid fa-rectangle-ad mb-3"
            ></i>{" "}
            <h3 className={"title2"}>Advertise with us</h3>
          </div>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              {loading && <LoadingBox></LoadingBox>}
              {error && (
                <MessageBox variant="danger">
                  {JSON.stringify(error)}
                </MessageBox>
              )}
              {success && (
                <MessageBox variant="success">Advertorial Created</MessageBox>
              )}

              <div className="form">
                <Select
                  className="multi-select"
                  placeholder={"Adertise Type"}
                  options={Object.keys(data.advert_types)?.map((key) => ({
                    value: key,
                    label: data.advert_types[key],
                  }))}
                  onChange={(adertise) => {
                    setAdvertisement({
                      ...advertisement,
                      type: adertise.value,
                    });
                  }}
                />
              </div>

              <div className={"form"}>
                <label htmlFor="title">Title</label>
                <input
                  id="title"
                  name={"title"}
                  type="text"
                  placeholder="Enter title"
                  onChange={onChange}
                ></input>
              </div>
              <div className={"form"}>
                <label htmlFor="link">Link</label>
                <input
                  id="link"
                  name={"link"}
                  type="text"
                  placeholder="Link to follow"
                  onChange={onChange}
                ></input>
              </div>

              <div className={"form"}>
                {uploading && <LoadingBox></LoadingBox>}
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
      )}
    </PageLayout>
  );
}
