import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Rating from "../components/Rating";

export default function ProductScreen() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState("");

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
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div>
          <div className="p-2">
            <Link to="/">Back to result</Link>
          </div>
          <div className="mb-3"></div>
          <div className="row top">
            <div className="col-2">
              <img
                className="large"
                src={selectedImage || product.image}
                alt={product.name}
              ></img>
              <div className="row start">
                {[product.image, ...product?.images].map((image) => (
                  <img
                    className="thumbnail"
                    src={image}
                    alt={product.name}
                    onClick={() => {
                      setSelectedImage(image);
                    }}
                  ></img>
                ))}
              </div>
            </div>
            <div className="col-3 mr-3 ml-3">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                  ></Rating>
                </li>
                <li>
                  <div className="row">
                    <div>Directors</div>
                    <div className="director-label">
                      {product.directors?.map((director) => (
                        <span>{director.name} | </span>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Casts</div>
                    <div className="cast-label">
                      {product.casts?.map((cast) => (
                        <span>{cast.name} | </span>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Artists</div>
                    <div className="artist-label">
                      {product.artists?.map((artist) => (
                        <span>{artist.name} | </span>
                      ))}
                    </div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Origin</div>
                    <div className="origin-label">{product.origin}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Year</div>
                    <div>{product.year}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Format</div>
                    <div className="format-label">{product.format}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Condition</div>
                    <div className="condition-label">{product.condition}</div>
                  </div>
                </li>
                <li>
                  <div className="row">
                    <div>Rolled / Folded</div>
                    <div className="rolledFolded-label">
                      {product.rolledFolded}
                    </div>
                  </div>
                </li>
                <li>
                  Description:
                  <p>{product.description}</p>
                </li>
                <li
                  className={"price"}
                  style={{
                    textDecoration: product.salePrice ? "line-through" : "",
                  }}
                >
                  Pirce : ${product.price}
                </li>
                {product.salePrice && (
                  <li className={"price"}>Sale Price : ${product.salePrice}</li>
                )}
              </ul>

              <div className="card card-body">
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
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
