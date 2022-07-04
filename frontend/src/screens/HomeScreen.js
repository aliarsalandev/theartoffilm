import React, { useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Product from "../components/Product";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { listProducts } from "../actions/productActions";
import HeroSection from "../sections/HeroSection";
import WelcomeSection from "../sections/WelcomeSection";
import HowItWorkSection from "../sections/HowItWorkSection";
import ShowcaseSection from "../sections/ShowcaseSection";
import Carousel from "react-elastic-carousel";
import SectionCard from "../components/SectionCard";
import SearchBox from "../components/SearchBox";
import { Link } from "react-router-dom";

export default function HomeScreen() {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  // const userTopSellersList = useSelector((state) => state.userTopSellersList);
  // const {
  //   loading: loadingSellers,
  //   error: errorSellers,
  //   users: sellers,
  // } = userTopSellersList;

  useEffect(() => {
    dispatch(listProducts({}));
    // dispatch(listTopSellers());
  }, [dispatch]);
  return (
    <div>
      <div
        className="section fh p-2"
        style={{
          position: "relative",
          backgroundImage: `url(/images/home.jpg)`,
        }}
      >
        <h1 className={"title title-xl"}>
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
                  { width: 550, itemsToShow: 4, itemsToScroll: 4 },
                  { width: 768, itemsToShow: 6 },
                  { width: 1200, itemsToShow: 6 },
                ]}
              >
                {products.map((product) => {
                  const show =
                    (product.image.length > 0) &
                    product.visible &
                    (product.price > 0);
                  return (
                    show === 1 && (
                      <div key={product._id} style={{ padding: "12px" }}>
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
            <Link to={"/search/name"} className={"button primary"}>
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
            linkText={"SUBSCRIBE"}
            link={"https://www.youtube.com/watch?v=ofkryTjra7Q"}
            type={"video"}
          />
        </div>
      </div>
    </div>
  );
}
