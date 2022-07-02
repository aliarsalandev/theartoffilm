import React, { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const params = useParams();
  const { id: productId } = params;

  const [qty, setQty] = useState(1);
  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);

  const addToCartHandler = () => {
    navigate(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div className={`${isMobile ? "mobile-page-padding" : "page-padding"}`}>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="p-2">
            <Link to={`/product/${product._id}/edit`}>Back to result</Link>
          </div>
          <div className="mb-3"></div>
          <div className={`${isMobile ? "column" : "flex"} top`}>
            <div className="col-2 col-xs-12">
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
            <div className="col-3 col-xs-12 mr-3 ml-3 poster-details">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr style={{ width: "100%" }}>
                    <td>
                      <h1>{product.name}</h1>
                    </td>
                    <td></td>
                  </tr>

                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Directors</td>
                    <td className="director-label text-right">
                      {product.directors?.map((director) => (
                        <span key={director.name}>{director.name} | </span>
                      ))}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Casts</td>
                    <td className="cast-label text-right">
                      {product.casts?.map((cast) => (
                        <span key={cast.name}>{cast.name} | </span>
                      ))}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Artists</td>
                    <td className="artist-label text-right">
                      {product.artists?.map((artist) => (
                        <span key={artist.name}>{artist.name} | </span>
                      ))}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Origin</td>
                    <td className="origin-label text-right">
                      {product.origin}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Year</td>
                    <td className={" text-right"}>{product.year}</td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Format</td>
                    <td className="format-label  text-right">
                      {product.format}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Condition</td>
                    <td className="condition-label  text-right">
                      {product.condition}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className={"bold td-title"}>Rolled / Folded</td>
                    <td className="rolledFolded-label  text-right">
                      {product.rolledFolded}
                    </td>
                  </tr>
                  <tr style={{ width: "100%" }}>
                    <td className="bold td-title">Description</td>
                    <td className={" text-right"}>{product.description}</td>
                  </tr>
                  <tr
                    style={{
                      textDecoration: product.salePrice ? "trne-through" : "",
                    }}
                  >
                    <td className="bold td-title">Price</td>
                    <td className="price text-right">
                      {symbol} {(rates[currency] * product.price).toFixed(2)}
                    </td>
                  </tr>
                  {product.salePrice > 0 && (
                    <tr className={"price"}>
                      <td>Sale Price : {symbol}</td>
                      <td className={"text-right"}>
                        {(rates[currency] * product.salePrice).toFixed(2)}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* <div className="card card-body">
                <ul>
                  <li>
                    <div className="row">
                      <div>Status</div>
                      <div>
                        {product.countInStock > 0 ? (
                          <span className="success">In Stock</span>
                        ) : (
                          <span className="danger">Unavailable</span>
                        )}
                      </div>
                    </div>
                  </li>
                  {product.countInStock > 0 && (
                    <>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select
                              value={qty}
                              onChange={(e) => setQty(e.target.value)}
                            >
                              {[...Array(product.countInStock).keys()].map(
                                (x) => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>
                      </li>
                      {product.forSale && (
                        <>
                          <li>
                            <button
                              onClick={addToCartHandler}
                              className="primary block"
                            >
                              Add to Cart
                            </button>
                          </li>
                        </>
                      )}
                    </>
                  )}
                </ul>
              </div> */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
