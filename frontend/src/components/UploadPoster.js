import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createProduct } from "../actions/productActions";

function UploadPoster({ isLink = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: creating, product } = useSelector(
    (state) => state.productCreate
  );

  useEffect(() => {
    if (product) navigate(`/product/${product._id}/edit`);
    return () => {};
  }, [creating, navigate, product]);

  const createHandler = () => {
    dispatch(createProduct());
  };
  return isLink ? (
    <span className="link" onClick={createHandler}>
      <i className={"fas fa-plus "}></i> Upload Poster
    </span>
  ) : (
    <button className="primary" onClick={createHandler}>
      Upload Poster
    </button>
  );
}

export default UploadPoster;
