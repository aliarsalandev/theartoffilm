import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import { detailsUser } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import ShowCase from "../components/ShowCase";
import { useNavigate } from "react-router-dom";

export default function SellerScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;

  const [currentProduct, setCurrentProduct] = React.useState(null);
  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const productList = useSelector((state) => state.productList);
  const {
    loading: loadingProducts,
    error: errorProducts,
    products,
  } = productList;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsUser(sellerId));
    dispatch(listProducts({ seller: sellerId }));
  }, [dispatch, sellerId]);
  const navigate = useNavigate();

  const addToCartHandler = () => {
    navigate(`/cart/${currentProduct._id}?qty=1}`);
  };
  return (
    <div className="row start top">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <div className="col-1">
          <ul className="card card-body">
            <li>
              <div className="row start">
                <div className="p-1">
                  <img
                    className="small"
                    src={user.seller.logo}
                    alt={user.seller.name}
                  ></img>
                </div>
                <div className="p-1">
                  <h1>{user.seller.name}</h1>
                </div>
              </div>
            </li>

            <li>
              <a href={`mailto:${user.email}`}>Contact Seller</a>
            </li>
            <li>{user.seller.description}</li>
          </ul>
        </div>
      )}
      <div className="col-3 mb-3">
        {loadingProducts ? (
          <LoadingBox></LoadingBox>
        ) : errorProducts ? (
          <MessageBox variant="danger">{errorProducts}</MessageBox>
        ) : (
          <>
            <div className={""}>
              <ShowCase
                products={products.filter((product) => product.visible)}
                onClick={(product) => {
                  setCurrentProduct(product);
                }}
              />
            </div>

            {products.length === 0 && <MessageBox>No Poster Found</MessageBox>}

            <div className="row center">
              {currentProduct && (
                <ul>
                  <li>
                    <h1>{currentProduct.name}</h1>
                  </li>

                  <li>
                    <div className="row">
                      <div>Directors</div>
                      <div className="director-label">
                        {currentProduct.directors?.map((director) => (
                          <span>{director.name} | </span>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Casts</div>
                      <div className="cast-label">
                        {currentProduct.casts?.map((cast) => (
                          <span>{cast.name} | </span>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Artists</div>
                      <div className="artist-label">
                        {currentProduct.artists?.map((artist) => (
                          <span>{artist.name} | </span>
                        ))}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Origin</div>
                      <div className="origin-label">
                        {currentProduct.origin}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Year</div>
                      <div className="origin-label">{currentProduct.year}</div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Format</div>
                      <div className="format-label">
                        {currentProduct.format}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Condition</div>
                      <div className="condition-label">
                        {currentProduct.condition}
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="row">
                      <div>Rolled / Folded</div>
                      <div className="rolledFolded-label">
                        {currentProduct.rolledFolded}
                      </div>
                    </div>
                  </li>
                  <li>
                    Description:
                    <p>{currentProduct.description}</p>
                  </li>
                  <li>Pirce : ${currentProduct.price}</li>

                  {currentProduct.forSale && (
                    <>
                      <li>
                        <div className="row">
                          <button
                            onClick={addToCartHandler}
                            className="primary showcase"
                          >
                            Add to Cart
                          </button>
                        </div>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </div>

            {/* <div className="row center">
              {products.map((product) => (
                <Product key={product._id} product={product}></Product>
              ))}
            </div> */}
          </>
        )}
      </div>

      {/*  */}
    </div>
  );
}
