import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { createProduct, listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";

function UploadPoster({ isLink = false }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading: creating, product } = useSelector(
    (state) => state.productCreate
  );
  const { user } = useSelector((state) => state.userDetails);
  const { userInfo } = useSelector((state) => state.userSignin);

  const productList = useSelector((state) => state.productList);
  const { products } = productList;

  useEffect(() => {
    dispatch(listProducts({ seller: userInfo._id }));
  }, [dispatch, userInfo._id]);

  useEffect(() => {
    dispatch(detailsUser(userInfo._id));
  }, [dispatch, userInfo]);

  useEffect(() => {
    if (product) navigate(`/product/${product._id}/edit`);
    return () => {};
  }, [creating, navigate, product]);

  const createHandler = () => {
    if (user?.seller.subscription.products > products.length) {
      dispatch(createProduct());
    } else {
      alert(
        `You can only create ${user?.seller.subscription.products} products`
      );
    }
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
