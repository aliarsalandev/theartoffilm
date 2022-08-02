import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { deleteProduct, listProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import UploadPoster from "../components/UploadPoster";
import {
  PRODUCT_CREATE_RESET,
  PRODUCT_DELETE_RESET,
} from "../constants/productConstants";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";
import PageLayout from "../layouts/page";

export default function ProductListScreen(props) {
  const navigate = useNavigate();

  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  const { pathname } = useLocation();
  const sellerMode = pathname.indexOf("/seller") >= 0;
  const productList = useSelector((state) => state.productList);
  const { loading, error, products, page, pages } = productList;

  const productCreate = useSelector((state) => state.productCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    product: createdProduct,
  } = productCreate;

  const productDelete = useSelector((state) => state.productDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = productDelete;
  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;
  const dispatch = useDispatch();
  useEffect(() => {
    if (successCreate) {
      dispatch({ type: PRODUCT_CREATE_RESET });
      navigate(`/product/${createdProduct._id}/edit`);
    }
    if (successDelete) {
      dispatch({ type: PRODUCT_DELETE_RESET });
    }
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber: 1 })
    );
  }, [
    createdProduct,
    dispatch,
    navigate,
    sellerMode,
    successCreate,
    successDelete,
    userInfo._id,
  ]);

  const loadPageProducts = (_pageNumber) => {
    dispatch(
      listProducts({ seller: sellerMode ? userInfo._id : "", pageNumber: _pageNumber })
    );
  }
  const deleteHandler = (product) => {
    if (window.confirm("Are you sure to delete?")) {
      dispatch(deleteProduct(product._id));
    }
  };

  return (
    <PageLayout>
      <div className={"ml-3 col-3 p-2"}>
        <div>
          {userInfo?.isSeller && (
            <div className="row mtb-2">
              <h2 className={"title2"}>Posters</h2>
              <UploadPoster />
            </div>
          )}

          {loadingDelete && <LoadingBox></LoadingBox>}
          {errorDelete && (
            <MessageBox variant="danger">{errorDelete}</MessageBox>
          )}
          {loadingCreate && <LoadingBox></LoadingBox>}
          {errorCreate && (
            <MessageBox variant="danger">{errorCreate}</MessageBox>
          )}
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            <>
              <table className="table">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>POSTER MARKET VALUE</th>
                    <th>VISIBILITY</th>
                    <th>FOR SALE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>
                        {!product.image ? (
                          <div className={"avatar"}>{product.name}</div>
                        ) : (
                          <img
                            width={120}
                            height={120}
                            src={product.image}
                            alt={product.name}
                          />
                        )}
                      </td>
                      <td>
                        <Link to={`/product/${product._id}`} target="_blank">
                          {product.name}
                        </Link>
                      </td>
                      <td>
                        {symbol} {(rates[currency] * product.price).toFixed(2)}
                      </td>
                      <td>{product.visible ? "Visible" : "Not Visible"}</td>
                      <td>{product.forSale ? "For Sale" : "Not For Sale"}</td>
                      <td>
                        <button
                          type="button"
                          className="small"
                          onClick={() =>
                            navigate(`/product/${product._id}/edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="small"
                          onClick={() => deleteHandler(product)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="row center pagination">
                {[...Array(pages).keys()].map((x) => (
                  <button
                    className={x + 1 === page ? "active" : ""}
                    key={x + 1}
                    onClick={(e) => {
                      e.preventDefault()
                      loadPageProducts(x + 1)
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
    </PageLayout>
  );
}
