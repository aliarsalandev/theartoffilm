import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ShowCase from "../components/ShowCase";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";
import data from "../data";
import { useNavigate } from "../../node_modules/react-router-dom/index";

export default function SellerScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;

  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error } = userDetails;

  const productList = useSelector((state) => state.productList);

  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;
  const [currentProduct, setCurrentProduct] = React.useState();
  const { user } = useSelector((state) => state.userDetails);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

  const cart = useSelector((state) => state.cart);
  const cartItems = cart?.cartItems;

  const navigate = useNavigate();

  const addToCartHandler = (id) => {
    if (cartItems.length === 0) {
      navigate(`/cart/${id}?qty=1`);
    } else {
      navigate("/cart");
    }
  };

  return (
    <div className="bg-light-dark">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <></>
      )}
      {loadingProducts ? (
        <LoadingBox></LoadingBox>
      ) : errorProducts ? (
        <MessageBox variant="danger">{errorProducts}</MessageBox>
      ) : (
        <>
          <div className="flex center p-4">
            {user?._id === sellerId ? (
              <h2 className={"title2"}>{user?.seller.name}</h2>
            ) : (
              ""
            )}
          </div>

          <ShowCase
            products={products?.filter((product) => product.visible)}
            onClick={(product) => {
              setCurrentProduct(product);
            }}
          />

          {products.length === 0 && <MessageBox>No Poster Found</MessageBox>}

          {currentProduct && (
            <div className="flex top p-2 poster-details">
              <div>
                <img
                  className={"w-80  m-2"}
                  src={currentProduct?.image}
                  alt="poster"
                />
              </div>
              <div className="flex start top column">
                <table
                  style={{ width: "50%", margin: "0 auto" }}
                  className="product-page-table"
                >
                  <tbody>
                    <tr className={"flex row start"} style={{ width: "100%" }}>
                      <td className={"bold td-title text-accent"}>
                        <h1 className="product-page-title">
                          {currentProduct.name}
                        </h1>
                      </td>
                      <td className="director-label text-right">
                        {currentProduct?.seller?._id === user?._id && (
                          <Link to={`/product/${currentProduct._id}/edit`}>
                            Edit
                          </Link>
                        )}
                      </td>
                    </tr>
                    {currentProduct.directors.length > 0 && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>
                          Director
                        </td>
                        <td className="director-label text-right">
                          {currentProduct.directors?.map((director, index) => {
                            if (index < currentProduct.directors.length - 1) {
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
                    {currentProduct.casts.length > 0 && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>Cast</td>
                        <td className="cast-label text-right">
                          {currentProduct.casts?.map((cast, index) => {
                            if (index < currentProduct.casts.length - 1) {
                              return <span key={cast.name}>{cast.name},</span>;
                            }
                            return <span key={cast.name}>{cast.name}</span>;
                          })}
                        </td>
                      </tr>
                    )}
                    {currentProduct.artists.length > 0 && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>Artist</td>
                        <td className="artist-label text-right">
                          {currentProduct.artists?.map((artist, index) => {
                            if (index < currentProduct.artists.length - 1) {
                              return (
                                <span key={artist.name}>{artist.name},</span>
                              );
                            }
                            return <span key={artist.name}>{artist.name}</span>;
                          })}
                        </td>
                      </tr>
                    )}
                    {currentProduct.origin && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>
                          Country of Origin
                        </td>
                        <td className="origin-label text-right">
                          {
                            data.origins.find(
                              ({ code }) => code === currentProduct.origin
                            )?.name
                          }
                        </td>
                      </tr>
                    )}
                    {currentProduct.origin && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>Year</td>
                        <td className={" text-right"}>{currentProduct.year}</td>
                      </tr>
                    )}
                    {currentProduct.format && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>Format</td>
                        <td className="format-label  text-right">
                          {currentProduct.format}
                        </td>
                      </tr>
                    )}
                    {currentProduct.condition && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>
                          Condition
                        </td>
                        <td className="condition-label  text-right">
                          {currentProduct.condition}
                        </td>
                      </tr>
                    )}
                    {currentProduct.rolledFolded && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className={"bold td-title text-accent"}>
                          Rolled / Folded
                        </td>
                        <td className="rolledFolded-label  text-right">
                          {currentProduct.rolledFolded}
                        </td>
                      </tr>
                    )}
                    {currentProduct.description && (
                      <tr className={"flex"} style={{ width: "100%" }}>
                        <td className="bold td-title text-accent">
                          Description
                        </td>
                        <td className={" text-right"}>
                          {currentProduct.description}
                        </td>
                      </tr>
                    )}
                    <tr
                      className={"flex align-center"}
                      style={{
                        textDecoration: currentProduct.forSale
                          ? "line-through"
                          : "",
                      }}
                    >
                      <td className="bold td-title text-accent">Price</td>
                      <td
                        className={`bold ${
                          currentProduct.forSale ? "line-through" : ""
                        } price text-right`}
                      >
                        {symbol}{" "}
                        {(rates[currency] * currentProduct.price).toFixed(2)}
                      </td>
                    </tr>
                    {currentProduct.salePrice > 0 && (
                      <tr className={"flex"}>
                        <td className="bold td-title text-accent">
                          Sale Price
                        </td>
                        <td className={"text-right"}>
                          {symbol}{" "}
                          {(rates[currency] * currentProduct.salePrice).toFixed(
                            2
                          )}
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
                  {currentProduct.countInStock > 0 && (
                    <>
                      <button
                        onClick={() => {
                          addToCartHandler(currentProduct._id);
                        }}
                        className="primary block"
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}
          {/* <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div> */}
        </>
      )}
    </div>
  );
}
