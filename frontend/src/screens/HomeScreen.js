import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import WelcomeSection from "../sections/WelcomeSection";
import HowItWorkSection from "../sections/HowItWorkSection";
import ShowcaseSection from "../sections/ShowcaseSection";
import Carousel from "react-elastic-carousel";
import SectionCard from "../components/SectionCard";
import SearchBox from "../components/SearchBox";
import { Link } from "react-router-dom";
import { sellersList } from "../helpers/profile";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import data from "../data";
import { getAdvertisments } from "../helpers/advertise";
export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  const [sellers, setSellers] = React.useState([]);
  const { userInfo } = useSelector((state) => state.userSignin);
  const [advertisements, setAdvertisments] = React.useState([]);
  const [backgroundImage, setBackgroundImage] = React.useState("");
  const [backgroundIndex, setBackgroundIndex] = React.useState(0);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    // dispatch(listTopSellers());
  }, [dispatch]);

  useEffect(() => {
    dispatch(listProducts({}));
    sellersList().then((data) => {
      setSellers((prevSellers) => [...prevSellers, ...data]);
    });
  }, [dispatch]);

  useEffect(() => {
    getAdvertisments(userInfo).then((data) => {
      console.log(data?.advertisements);

      setAdvertisments(data?.advertisements);
      setBackgroundImage(data?.advertisements[0].image);
    });
  }, [userInfo]);

  let myIndex = 0;

  const carousel = () => {
    var i;
    var x = document.getElementsByClassName("advertisements");
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1;
    }
    x[myIndex - 1].style.display = "block";
    setTimeout(carousel, 6000); // Change image every 2 seconds
  };
  useEffect(() => {
    window.onload = () => {
      window.scrollTo(0, 0);
      carousel();
    };
  }, []);

  return (
    <NoSideBarLayout>
      <div
        className="section fh p-2"
        style={{
          position: "relative",
          backgroundImage:
            !advertisements.length === 0 && `url(/images/home.jpg)`,
        }}
      >
        {advertisements.map((advertisment) => (
          <div
            className={"advertisements"}
            style={{
              backgroundImage: `url(${advertisment.image})`,
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              overflow: "hidden",
            }}
          >
            <a
              style={{
                position: "absolute",
                bottom: "20px",
                right: "20px",
                zIndex: 9999,
              }}
              href={advertisment.link}
              target="_blank"
              rel="noreferrer"
            >
              <i title="open" className="fa fa-window-maximize" />
              open
            </a>
          </div>
        ))}

        <h1 className={" title-xl"}>
          <span className="selection">The Art Of</span> Film
        </h1>
        <h2
          className={"text-center text-md "}
          style={{ margin: "2rem auto", fontSize: "26px" }}
        >
          A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT
        </h2>
        <div className="flex row center">
          <SearchBox />
        </div>
        <div className="layer"></div>
      </div>
      <WelcomeSection />
      <div className="bg-light-dark">
        <HowItWorkSection />
        <ShowcaseSection />
      </div>

      <div className="mtb-2 secondary ptb-2">
        <div className="p-2 flex justify-center">
          <h2 className={"title2 text-center"}>
            <span className="selection">Shop for</span> Posters
          </h2>
        </div>
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <>
            {products.length === 0 && <MessageBox>No Posters Found</MessageBox>}
            <div className="row start p-2">
              <Carousel
                breakPoints={[
                  { width: 2, itemsToShow: 1 },
                  { width: 550, itemsToShow: 3, itemsToScroll: 3 },
                  { width: 768, itemsToShow: 3 },
                  { width: 1200, itemsToShow: 3 },
                ]}
              >
                {products.map((product) => {
                  const show = (product.image.length > 0) & product.visible;
                  return (
                    show === 1 && (
                      <div key={product._id}>
                        <Product
                          toshop={true}
                          key={product._id}
                          product={product}
                        ></Product>
                      </div>
                    )
                  );
                })}
              </Carousel>
            </div>
          </>
        )}
      </div>
      <div>
        <div
          className="mtb-2 flex column center p-2"
          style={{ minHeight: "320px" }}
        >
          <h2 className={"title2 text-center mb-2"}>
            <span className={"selection"}>Shop</span> FOR MOVIE POSTERS
          </h2>
          <br />
          <div className="flex column column-center">
            <Link to={"/shop/name"} className={"button primary"}>
              VISIT SHOP
            </Link>
          </div>
        </div>
        <div className="m">
          <SectionCard
            before={"SUBSCRIBE"}
            title={"TO YOU TUBE"}
            text={
              "Sign up to The Art of Film YouTube channel today as we regularly upload movie poster related videos content that we know you will love. "
            }
            linkText={"SUBSCRIBE Today"}
            link={"https://www.youtube.com/watch?v=ofkryTjra7Q"}
            type={"video"}
          />
        </div>

        <div className="flex column p-4">
          <br />
          <div className="p-2 flex justify-center">
            <h2 className={"title2 text-center"}>
              <span className="selection">Browse</span> Showcases
            </h2>
          </div>
          <br />
          <div className={"flex col "}>
            <Carousel
              breakPoints={[
                { width: 2, itemsToShow: 1 },
                { width: 550, itemsToShow: 3, itemsToScroll: 3 },
                { width: 768, itemsToShow: 3 },
                { width: 1200, itemsToShow: 3 },
              ]}
            >
              {sellers?.map((seller) => {
                return (
                  <div className={"bg-light-dark"}>
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
                              <div
                                style={{
                                  width: "120px",
                                  height: "120px",
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
                            </div>
                          </Link>
                          <div className="p-1">
                            <Link to={`/seller/${seller._id}`}>
                              <h2 className={"title3"}>{seller.seller.name}</h2>
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
                  </div>
                );
              })}
            </Carousel>
          </div>
          {/* <CoverFlowComponent
            imagesArr={sellers?.map(({ seller }) => seller.logo)}
            direction="horizontal"
            width={`${isMobile ? "100%" : "100%"}`}
            height={`${isMobile ? "100%" : 425}`}
            itemRatio="21:14"
            background="transparent"
            onClick={(seller) => {}}
            handleSelect={(index) => {
              const _seller = sellers?.find((seller, ind) => ind === index);
              navigate(`/seller/${_seller?._id}`);
            }}
            labelsArr={sellers?.map(({ seller }) => seller.name)}
          /> */}
        </div>
      </div>
    </NoSideBarLayout>
  );
}
