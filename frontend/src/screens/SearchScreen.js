import React, { useCallback, useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  listProductArtists,
  listProductCasts,
  listProductDirectors,
  listProducts,
  searchProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import data from "../data";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import { prices } from "../utils";

export default function SearchScreen(props) {
  const { directors } = useSelector((state) => state.directorList);
  const { casts } = useSelector((state) => state.castList);
  const { artists } = useSelector((state) => state.artistList);

  const { name: movie_name } = useParams();

  const { currency } = useCurrency();
  const symbol = useSymbol(currency);

  const {
    name = "all",
    // category = 'all',
    min = 0,
    max = 0,
    rating = 0,
    order = "newest",
    pageNumber = 1,
  } = useParams();
  const dispatch = useDispatch();
  const { loading, error, products, page, pages } = useSelector((state) => state.productList);

  // const productCategoryList = useSelector((state) => state.productCategoryList);
  // const {
  //   loading: loadingCategories,
  //   error: errorCategories,
  //   categories,
  // } = productCategoryList;

  useEffect(() => {
    dispatch(listProductDirectors());

    dispatch(listProductCasts());
    dispatch(listProductArtists());
  }, [dispatch]);
  // category

  const [currentPage, setCurrentPage] = React.useState(pageNumber);
  const updateSearchUrl = useCallback(
    (e) => {
      const { name, value } = e.target;

      let _search_url = {};

      if (localStorage.getItem("search_query") !== "") {
        _search_url = JSON.parse(localStorage.getItem("search_query"));
      }
      if (name !== "") {
        _search_url = {
          ..._search_url,
          [name]: value,
        };
        localStorage.setItem("search_query", JSON.stringify(_search_url));
      }
      const query = Object.keys(_search_url)
        .map((k) => `${k}=${_search_url[k]}`)
        .join("&");

      dispatch(searchProducts(`pageNumber=${currentPage}&${query}`));
    },
    [currentPage, dispatch]
  );

  useEffect(() => { }, [currentPage, dispatch, movie_name]);

  useEffect(() => {
    if (products) {
      window.scrollTo(0, 0);

    }
  }, [products]);

  useEffect(() => {
    if (movie_name !== undefined) {
      dispatch(searchProducts(`pageNumber=${currentPage}&name=${movie_name}`));
    } else {
      dispatch(
        listProducts({
          pageNumber: currentPage,
          name: name !== "all" ? name : movie_name,
          min,
          max,
          order,
        })
      );
    }
  }, [currentPage, dispatch, max, min, movie_name, name, order, rating]);

  return (
    <NoSideBarLayout>
      <div className="p-4">
        <div className="row">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <div className={"p-2"}>
              {
                products.filter(
                  (product) =>
                    (product.image.length > 0) &
                    product.visible &
                    product.forSale
                ).length
              }{" "}
              Results
            </div>
          )}
          <div className={"p-2"}>
            <select value={order} name="order">
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className={`flex ${isMobile ? "column" : "row"} top`}>
          <div className={`col-1`}>
            <div className="form-group">
              <button
                className={"btn btn-primary"}
                onClick={() => {
                  localStorage.setItem("search_query", "");
                  window.location.href = "/shop/name/";
                }}
              >
                clear
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="form-group">
              <label>Movie Title</label>
              <input type="text" name="name" onChange={updateSearchUrl} />
            </div>

            <div className="form-group">
              <label>Director</label>
              <select
                className={"form-control"}
                name="directors"
                onChange={updateSearchUrl}
              >
                <option value="">Director</option>
                {directors?.map((director) => (
                  <option key={director._id} value={director._id}>
                    {director.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Cast</label>
              <select
                className={"form-control"}
                name="casts"
                onChange={updateSearchUrl}
              >
                <option value="">Cast</option>
                {casts?.map((cast) => (
                  <option key={cast._id} value={cast._id}>
                    {cast.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Artist</label>
              <select
                className={"form-control"}
                name="artists"
                onChange={updateSearchUrl}
              >
                <option value="">Artist</option>
                {artists?.map((artist) => (
                  <option key={artist._id} value={artist._id}>
                    {artist.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Country of Origin</label>
              <select
                className={"form-control"}
                name="origin"
                onChange={updateSearchUrl}
              >
                <option value="">Origin</option>
                {data.origins?.map((origin) => (
                  <option key={origin.code} value={origin.code}>
                    {origin.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <select
                className={"form-control"}
                name="year"
                onChange={updateSearchUrl}
              >
                <option value="">Year</option>
                {Array.from(Array(new Date().getFullYear() - 1929).keys())?.map(
                  (year) => (
                    <option key={year} value={year + 1930}>
                      {year + 1930}
                    </option>
                  )
                )}
              </select>
            </div>

            <div className="form-group">
              <label>Condition</label>
              <select
                className={"form-control"}
                name="condition"
                onChange={updateSearchUrl}
              >
                <option value="">Condition</option>
                {data.conditions?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Format</label>
              <select
                className={"form-control"}
                name="format"
                onChange={updateSearchUrl}
              >
                <option value="">Format</option>
                {data.formats?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <select
                className={"form-control"}
                name="price"
                onChange={updateSearchUrl}
              >
                <option value="">Price</option>
                {prices?.map((price) => (
                  <option key={price.name} value={`${price.min}-${price.max}`}>
                    {price.name.replaceAll("£", symbol)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={`col-3`}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products && products.length === 0 ? (
                  <div className={"flex column center text-center"}>
                    <h2 className={"title2"}>
                      <span className="selection">No results</span> found
                    </h2>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={`flex ${isMobile ? "column center" : "row start top plr-2"
                    } `}
                >
                  {products?.map((product) => {
                    const show =
                      (product.image.length > 0) &
                      product.visible &
                      product.forSale;
                    return (
                      show === 1 && (
                        <Product key={product._id} product={product}></Product>
                      )
                    );
                  })}
                </div>
                <div className="row center pagination">
                  {[...Array(pages).keys()].map((x) => (
                    <button
                      className={x + 1 === page ? "active" : ""}
                      key={x + 1}
                      onClick={() => {
                        // navigate(search_url);
                        setCurrentPage(x + 1);
                      }}
                    >
                      {x + 1}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </NoSideBarLayout>
  );
}
