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

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);

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
          <div className="flex center pt-2">
            {currentProduct?.seller._id === sellerId ? (
              <h2 className={"title2"}>
                {currentProduct?.seller.seller?.name}
              </h2>
            ) : (
              ""
            )}
          </div>

          <ShowCase
            products={products.filter((product) => product.visible)}
            onClick={(product) => {
              setCurrentProduct(product);
            }}
          />

          {products.length === 0 && <MessageBox>No Poster Found</MessageBox>}

          <div className="flex p-2 poster-details">
            {currentProduct && (
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr className={"flex row start"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>
                      {currentProduct.name}
                    </td>
                    <td className="director-label text-right">
                      {currentProduct?.seller?._id === userInfo?._id && (
                        <Link to={`/product/${currentProduct._id}/edit`}>
                          Edit
                        </Link>
                      )}
                    </td>
                  </tr>

                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Directors</td>
                    <td className="director-label text-right">
                      {currentProduct.directors?.map((director) => (
                        <span key={director.name}>{director.name} | </span>
                      ))}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Casts</td>
                    <td className="cast-label text-right">
                      {currentProduct.casts?.map((cast) => (
                        <span key={cast.name}>{cast.name} | </span>
                      ))}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Artists</td>
                    <td className="artist-label text-right">
                      {currentProduct.artists?.map((artist) => (
                        <span key={artist.name}>{artist.name} | </span>
                      ))}
                    </td>
                  </tr>
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
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Year</td>
                    <td className={" text-right"}>{currentProduct.year}</td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Format</td>
                    <td className="format-label  text-right">
                      {currentProduct.format}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>Condition</td>
                    <td className="condition-label  text-right">
                      {currentProduct.condition}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className={"bold td-title text-accent"}>
                      Rolled / Folded
                    </td>
                    <td className="rolledFolded-label  text-right">
                      {currentProduct.rolledFolded}
                    </td>
                  </tr>
                  <tr className={"flex"} style={{ width: "100%" }}>
                    <td className="bold td-title text-accent">Description</td>
                    <td className={" text-right"}>
                      {currentProduct.description}
                    </td>
                  </tr>
                  {currentProduct.salePrice > 0 && (
                    <tr
                      className={"flex align-center"}
                      style={{
                        textDecoration: currentProduct.salePrice
                          ? "trne-through"
                          : "",
                      }}
                    >
                      <td className="bold td-title text-accent">Price</td>
                      <td className="line-through price text-right">
                        {symbol}{" "}
                        {(rates[currency] * currentProduct.price).toFixed(2)}
                      </td>
                    </tr>
                  )}
                  {currentProduct.salePrice > 0 && (
                    <tr className={"flex"}>
                      <td className="bold td-title text-accent">Sale Price</td>
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
            )}
          </div>

          {/* <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div> */}
        </>
      )}

      {/*  */}
    </div>
  );
}
