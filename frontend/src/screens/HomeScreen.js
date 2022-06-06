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
      <HeroSection />
      <WelcomeSection />
      <HowItWorkSection />
      <ShowcaseSection />
      <h2>Featured Posters</h2>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox variant="danger">{error}</MessageBox>
      ) : (
        <>
          {products.length === 0 && <MessageBox>No Posters Found</MessageBox>}
          <div className="row start">

            <Carousel breakPoints={[
              { width: 1, itemsToShow: 1 },
              { width: 550, itemsToShow: 4, itemsToScroll: 4 },
              { width: 768, itemsToShow: 6 },
              { width: 1200, itemsToShow: 6 }
            ]}>
              {products.map(
                (product) => {
                  const show =
                    (product.image.length > 0) &
                    product.visible &
                    (product.price > 0);
                  return show === 1 && (
                    <Product key={product._id} product={product}></Product>
                  )
                }
              )}
            </Carousel>
          </div>
        </>
      )
      }

      {/* <h2>Top Sellers</h2>
      {loadingSellers ? (
        <LoadingBox></LoadingBox>
      ) : errorSellers ? (
        <MessageBox variant="danger">{errorSellers}</MessageBox>
      ) : (
        <>
          {sellers.length === 0 && <MessageBox>No Seller Found</MessageBox>}
          <Carousel showArrows autoPlay showThumbs={false}>
            {sellers.map((seller) => (
              <div key={seller._id}>
                <Link to={`/seller/${seller._id}`}>
                  <img src={seller.seller.logo} alt={seller.seller.name} />
                  <p className="legend">{seller.seller.name}</p>
                </Link>
              </div>
            ))}
          </Carousel>
        </>
      )} */}
    </div >
  );
}
