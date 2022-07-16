import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listSellers } from "../actions/userActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import HeroSection from "../sections/HeroSection";
import data from "../data";

export default function SellersScreen(props) {
  const params = useParams();
  const { id: sellerId } = params;
  const { loading, error, sellers } = useSelector((state) => state.sellerList);

  // const [currentProduct, setCurrentProduct] = React.useState(null);
  // const navigate = useNavigate();

  // const addToCartHandler = () => {
  //   navigate(`/cart/${currentProduct._id}?qty=1}`);
  // };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(listSellers());
  }, [dispatch, sellerId]);

  return (
    <div>
      <HeroSection
        heading={"SHOWCASE GALLERIES"}
        heading2=""
        image="/images/Henry-Bedroom-2-1.jpg"
      />
      <div className="ptb-2 bg-light-dark" style={{ padding: "4rem" }}>
        <div className="flex row start">
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            sellers.map(
              (seller) =>
                seller.seller.logo && (
                  <ul
                    className="card card-body bg-dark"
                    style={{ listStyle: "none" }}
                  >
                    <li>
                      <div className="row top">
                        <Link to={`/seller/${seller._id}`}>
                          <div
                            className="p-1"
                            title={seller.seller.name}
                            style={{
                              overflow: "hidden",
                            }}
                          >
                            <img
                              style={{
                                width: "120px",
                                height: "120px",
                                objectFit: "contain",
                                overflow: "hidden",
                              }}
                              src={seller.seller.logo}
                              alt={seller.seller.name}
                            ></img>
                          </div>
                        </Link>
                        <div className="p-1">
                          <Link to={`/seller/${seller._id}`}>
                            <h1>{seller.seller.name}</h1>
                          </Link>
                        </div>
                      </div>
                    </li>

                    <li>
                      <div className={"row between"}>
                        <div className="row start">
                          <span className={"mr-2"}>
                            {
                              data.stripe_origins.find(
                                (stripe_origin) =>
                                  stripe_origin.code === seller?.country
                              )?.name
                            }
                          </span>
                          <span style={{ fontSize: "2.5rem" }}>
                            {data.flags[seller?.country]}
                          </span>
                        </div>
                        <div className={"large"}>
                          <Link to={`/seller/${seller._id}`}>
                            <i className="fas fa-arrow-right"></i>
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                )
            )
          )}
        </div>
      </div>
    </div>
  );
}
