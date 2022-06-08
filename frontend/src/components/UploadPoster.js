import React from "react";
import { useDispatch } from "react-redux";
import { createProduct } from "../actions/productActions";

function UploadPoster({ isLink = false }) {
  const dispatch = useDispatch();

  const createHandler = () => {
    dispatch(createProduct());
  };
  return isLink ? (
    <span className="link" onClick={createHandler}>
      <i className={"fas fa-plus "}></i> Upload Posters
    </span>
  ) : (
    <button className="primary" onClick={createHandler}>
      Upload Posters
    </button>
  );
}

export default UploadPoster;
