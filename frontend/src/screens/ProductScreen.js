import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "../../node_modules/react-router-dom/index";
import { detailsProduct } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import data from "../data";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function ProductScreen() {
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const params = useParams();
  const { id: productId } = params;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const navigate = useNavigate();

  const { user: seller } = useSelector((state) => state.userDetails);

  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems;

  useEffect(() => {
    dispatch(detailsUser(product?.seller._id));
    return () => {};
  }, [dispatch, product]);

  useEffect(() => {
    localStorage.setItem(
      "shippingCost",
      JSON.stringify(seller?.seller?.shipping_cost)
    );

    return () => {};
  }, [seller]);

  const addToCartHandler = () => {
    if (cartItems.length === 0) {
      navigate(`/cart/${productId}?qty=1`);
    } else {
      navigate("/cart");
    }
  };
  return (
    <div
      className={`bg-light-dark ${
        isMobile ? "mobile-page-padding" : "page-padding"
      }`}
    >
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div>
            <Link to={userInfo ? `/product/${product._id}/edit` : `/shop/name`}>
              {userInfo?.isSeller || userInfo?.isAdmin
                ? "Back to result"
                : "Back to Shop"}
            </Link>
          </div>
          <div className="mb-3"></div>
          <div className={`flex ${isMobile ? "column" : ""} top`}>
            <div className="flex column  col-3 col-xs-12 product-page-image-box">
              <img
                className="large"
                src={selectedImage || product.image}
                alt={product.name}
              ></img>
              <div className="flex start">
                {[product.image, ...product?.images].map((image) => (
                  <img
                    key={image}
                    className={`${isMobile ? "small" : "thumbnail"}`}
                    src={image}
                    alt={product.name}
                    onClick={() => {
                      setSelectedImage(image);
                    }}
                  ></img>
                ))}
              </div>
            </div>
            <div className="flex start top column end col-3 col-xs-12 product-page-details-box">
              <table style={{ width: "100%" }} className="product-page-table">
                <tbody>
                  <tr style={{ width: "100%" }}>
                    <td style={{ width: "100%" }}>
                      <h1 className="title2 product-page-title text-start">
                        {product.name}
                      </h1>
                    </td>
                    <td></td>
                  </tr>

                  {product.directors && (
                    <tr className={"flex"} style={{ width: "100%" }}>
                      <td className={"bold td-title text-accent"}>Director</td>
                      <td className="bold director-label text-right">
                        {product.directors?.map((director, index) => {
                          if (index < product.directors.length - 1) {
                            return (
                              <span key={director._id}>
                                {director.name}
                                <span className="comma">, </span>
                              </span>
                            );
                          }
                          return (
                            <span key={director.name}>{director.name}</span>
                          );
                        })}
                      </td>
                    </tr>
                  )}
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Cast</td>
                    <td className="bold cast-label text-right">
                      {product.casts?.map((casts, index) => {
                        if (index < product.casts.length - 1) {
                          return (
                            <span key={casts._id}>
                              {casts.name}
                              <span className="comma">, </span>
                            </span>
                          );
                        }
                        return <span key={casts.name}>{casts.name}</span>;
                      })}
                    </td>
                  </tr>
                  {product.artists && (
                    <tr className={"flex"} style={{ width: "100%" }}>
                      <td className={"bold td-title text-accent"}>Artist</td>
                      <td className="bold artist-label text-right">
                        {product.artists?.map((artists, index) => {
                          if (index < product.artists.length - 1) {
                            return (
                              <span key={artists._id}>
                                {artists.name}
                                <span className="comma">, </span>
                              </span>
                            );
                          }
                          return <span key={artists.name}>{artists.name}</span>;
                        })}
                      </td>
                    </tr>
                  )}
                  {product?.origin && (
                    <tr className={"flex"} style={{ width: "100%" }}>
                      <td className={"bold td-title text-accent"}>
                        Country of Origin
                      </td>
                      <td className="bold   text-right">
                        {
                          data.origins.find(
                            ({ code }) => code === product.origin
                          )?.name
                        }
                      </td>
                    </tr>
                  )}
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Year</td>
                    <td className={"bold text-right"}>{product.year}</td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Format</td>
                    <td className="bold format-label  text-right">
                      {product.format}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold bold td-title text-accent"}>
                      Condition
                    </td>
                    <td className="bold condition-label  text-right">
                      {product.condition}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>
                      Rolled / Folded
                    </td>
                    <td className="bold rolledFolded-label  text-right">
                      {product.rolledFolded}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className="bold td-title text-accent">Description</td>
                    <td className={"bold text-right"}>{product.description}</td>
                  </tr>
                  {product.salePrice > 0 && (
                    <tr
                      className={"flex align-center"}
                      style={{
                        textDecoration: product.salePrice ? "trne-through" : "",
                      }}
                    >
                      <td className="bold td-title text-accent">Price</td>
                      <td className="bold line-through price text-right">
                        {symbol} {(rates[currency] * product.price).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {product.salePrice > 0 && (
                    <tr className={"flex"}>
                      <td className="bold td-title text-accent">Sale Price</td>
                      <td className={"bold text-right"}>
                        {symbol}{" "}
                        {(rates[currency] * product.salePrice).toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              <div
                className={"text-end mt-2"}
                style={{
                  width: "100%",
                }}
              >
                {product.countInStock > 0 && (
                  <>
                    {product.forSale && (
                      <>
                        <button
                          onClick={addToCartHandler}
                          className="primary block"
                        >
                          Add to Cart
                        </button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
