import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  listProductArtists,
  listProductCasts,
  listProductDirectors,
  listProducts,
} from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";
import data from "../data";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import { prices } from "../utils";

export default function SearchScreen(props) {
  const navigate = useNavigate();

  const { directors } = useSelector((state) => state.directorList);
  const { casts } = useSelector((state) => state.castList);
  const { artists } = useSelector((state) => state.artistList);

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
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  // const productCategoryList = useSelector((state) => state.productCategoryList);
  // const {
  //   loading: loadingCategories,
  //   error: errorCategories,
  //   categories,
  // } = productCategoryList;

  useEffect(() => {
    dispatch(
      listProducts({
        pageNumber,
        name: name !== "all" ? name : "",
        min,
        max,
        rating,
        order,
      })
    );
  }, [dispatch, max, min, name, order, rating, pageNumber]);

  useEffect(() => {
    dispatch(listProductDirectors());
    dispatch(listProductCasts());
    dispatch(listProductArtists());
  }, [dispatch]);
  // category

  const getFilterUrl = (filter) => {
    const filterPage = filter.page || pageNumber;
    // const filterCategory = filter.category || category;
    const filterName = filter.name || name;
    // const filterRating = filter.rating || rating;
    const sortOrder = filter.order || order;
    const filterMin = filter.min ? filter.min : filter.min === 0 ? 0 : min;
    const filterMax = filter.max ? filter.max : filter.max === 0 ? 0 : max;
    let search_url = `/search/name/${filterName}/min/${filterMin}/max/${filterMax}/order/${sortOrder}/pageNumber/${filterPage}`;
    search_url += filter.directors ? `/directors/${[filter.directors]}` : ``;
    search_url += filter.casts ? `/casts/${[filter.casts]}` : ``;
    search_url += filter.artists ? `/artists/${[filter.artists]}` : ``;
    search_url += filter.origin ? `/origin/${filter.origin}` : ``;
    search_url += filter.year ? `/year/${filter.year}` : ``;
    search_url += filter.condition ? `/condition/${filter.condition}` : ``;
    search_url += filter.format ? `/format/${filter.format}` : ``;
    search_url += filter.rolledFolded
      ? `/rolledFolded/${filter.rolledFolded}`
      : ``;

    return search_url;
  };

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
                    (product.price > 0)
                ).length
              }{" "}
              Results
            </div>
          )}
          <div className={"p-2"}>
            Sort by{" "}
            <select
              value={order}
              onChange={(e) => {
                navigate(getFilterUrl({ order: e.target.value }));
              }}
            >
              <option value="newest">Newest Arrivals</option>
              <option value="lowest">Price: Low to High</option>
              <option value="highest">Price: High to Low</option>
            </select>
          </div>
        </div>
        <div className={`flex ${isMobile ? "column" : "row"} top`}>
          <div className={`col-1`}>
            {/* <h3>Department</h3>
          <div>
            {loadingCategories ? (
              <LoadingBox></LoadingBox>
            ) : errorCategories ? (
              <MessageBox variant="danger">{errorCategories}</MessageBox>
            ) : (
              <ul>
                <li>
                  <Link
                    className={'all' === category ? 'active' : ''}
                    to={getFilterUrl({ category: 'all' })}
                  >
                    Any
                  </Link>
                </li>
                {categories.map((c) => (
                  <li key={c}>
                    <Link
                      className={c === category ? 'active' : ''}
                      to={getFilterUrl({ category: c })}
                    >
                      {c}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div> */}
            <div className="form-group">
              <label>Director</label>
              <select
                className={"form-control"}
                onChange={(e) => {
                  navigate(getFilterUrl({ directors: [e.target.value] }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ casts: [e.target.value] }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ artists: [e.target.value] }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ origin: e.target.value }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ year: e.target.value }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ condition: e.target.value }));
                }}
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
                onChange={(e) => {
                  navigate(getFilterUrl({ format: e.target.value }));
                }}
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
              <label>Rolled Folded</label>
              <select
                className={"form-control"}
                onChange={(e) => {
                  navigate(getFilterUrl({ rolledFolded: e.target.value }));
                }}
              >
                <option value="">Rolled Folded</option>
                {data.rolledFolded?.map(({ label, value }) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Price</label>
              <div className={"flex column"}>
                {prices.map((p) => (
                  <Link
                    key={`${p.name}_${Math.random()}`}
                    style={{ cursor: "pointer" }}
                    to={getFilterUrl({ min: p.min, max: p.max })}
                  >
                    <span
                      className={
                        `selection ${p.min}-${p.max}` === `${min}-${max}`
                          ? "active"
                          : ""
                      }
                    >
                      {p.name.replaceAll("$", symbol)}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
            {/* <div>
            <h3>Avg. Customer Review</h3>
            <ul>
              {ratings.map((r) => (
                <li key={r.name}>
                  <Link
                    to={getFilterUrl({ rating: r.rating })}
                    className={`${r.rating}` === `${rating}` ? "active" : ""}
                  >
                    <Rating caption={" & up"} rating={r.rating}></Rating>
                  </Link>
                </li>
              ))}
            </ul>
          </div> */}
          </div>

          <div className={`col-3`}>
            {loading ? (
              <LoadingBox></LoadingBox>
            ) : error ? (
              <MessageBox variant="danger">{error}</MessageBox>
            ) : (
              <>
                {products.length === 0 ? (
                  <div className={"flex column center text-center"}>
                    <h2 className={"title2"}>
                      <span className="selection">No results</span> found
                    </h2>
                  </div>
                ) : (
                  <></>
                )}

                <div
                  className={`flex ${
                    isMobile ? "column center" : "row start top plr-2"
                  } `}
                >
                  {products.map((product) => {
                    const show =
                      (product.image.length > 0) &
                      product.visible &
                      (product.price > 0);
                    return (
                      show === 1 && (
                        <Product key={product._id} product={product}></Product>
                      )
                    );
                  })}
                </div>
                <div className="row center pagination">
                  {products.filter(
                    (product) =>
                      (product.image.length > 0) &
                      product.visible &
                      (product.price > 0)
                  ).length > 4 ? (
                    [...Array(pages).keys()].map((x) => (
                      <Link
                        className={x + 1 === page ? "active" : ""}
                        key={x + 1}
                        to={getFilterUrl({ page: x + 1 })}
                      >
                        {x + 1}
                      </Link>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </NoSideBarLayout>
  );
}
