import React, { Component, useState, useEffect } from "react";

import propTypes from "prop-types";
import CoverFlowComponent from "./CoverFlow";
import { isMobile } from "react-device-detect";
import Slider from "react-slick";
import { useRef } from "react";


const SlickSlider = ({ filteredProducts, onClick }) => {
  const sliderRef = useRef();


  const SlickArrowLeft = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-prev slick-arrow" +
        (currentSlide === 0 ? " slick-disabled" : "")
      }
      aria-disabled={currentSlide === 0 ? true : false}
      type="button"
      onClick={(e) => {


        if (currentSlide !== 0) {
          const product = filteredProducts?.find(
            (product, ind) => ind === currentSlide - 1
          );

          sliderRef.current.slickPrev();
          onClick(product);

        } else {
          const product = filteredProducts[filteredProducts.length - 1];
          onClick(product);
          sliderRef.current.slickGoTo(slideCount - 1);
        }
      }}
    >
      Previous
    </button>
  );
  const SlickArrowRight = ({ currentSlide, slideCount, ...props }) => (
    <button
      {...props}
      className={
        "slick-next slick-arrow" +
        (currentSlide === slideCount - 1 ? " slick-disabled" : "")
      }
      aria-disabled={currentSlide === slideCount - 1 ? true : false}
      type="button"
      onClick={(e) => {

        if (currentSlide === slideCount - 1) {
          const product = filteredProducts[0];
          sliderRef.current.slickGoTo(0);
          onClick(product);
          return;
        };
        const product = filteredProducts?.find(
          (product, ind) => ind === currentSlide + 1
        );

        sliderRef.current.slickNext();
        onClick(product);
      }}
    >
      Next
    </button>
  );


  const settings = {
    dots: true,
    className: "center",
    centerMode: true,
    centerPadding: "60px",
    infinite: true,
    slidesToShow: filteredProducts.length > 3 ? 3 : filteredProducts.length,
    slidesToScroll: 1,
    speed: 500,
    afterChange: index => {
      const product = filteredProducts?.find(
        (product, ind) => ind === index
      );
      onClick(product);
    },

    nextArrow: <SlickArrowLeft />,
    prevArrow: <SlickArrowRight />
  };


  return <Slider ref={sliderRef} {...settings} >
    {
      filteredProducts.filter((product, index) => product.image ?? false).map((product, index) => {
        return (
          <div key={product.id} >
            <img onClick={() => {
              const product = filteredProducts?.find(
                (product, ind) => ind === index
              );
              onClick(product);
              sliderRef.current.slickGoTo(index);

            }}
              src={product.image} style={{ maxWidth: "384px", margin: "0 auto" }} />
          </div>
        );
      })
    }
  </Slider>
}

function ShowCase({ products = [], onClick }) {
  const [filteredProducts, setFilteredProducts] = useState([]);


  useEffect(() => {
    setFilteredProducts(products);
    return () => { };
  }, []);



  return (
    <div className={"flex column center"}>

      <div className="row ptb-2 pagination">

        <span
          onClick={() => {
            setFilteredProducts(products);
          }}
        >
          All
        </span>

        {Array.from(Array(26).keys()).map((index) => {
          const alphabet = String.fromCharCode(index + 65);
          return (
            <span
              key={alphabet}
              onClick={() => {
                const _products = products.filter((product) => {
                  let name = product.name.toLowerCase();
                  // remove : the,A,An
                  if (name.indexOf("the") === 0) {
                    name = name.replace("the", "").trim();
                  } else if (name.indexOf("a") === 0) {
                    name = name.replace("a", "").trim();
                  } else if (name.indexOf("an") === 0) {
                    name = name.replace("an", "").trim();
                  }
                  return name.indexOf(alphabet.toLowerCase()) === 0;
                });
                setFilteredProducts(_products);
              }}
            >
              {alphabet}
            </span>
          );
        })}


        <span
          onClick={() => {
            const _products = products?.filter((product) => {
              let name = product.name.toLowerCase();
              if (name.indexOf("the") === 0) {
                name = name.replace("the", "").trim();
              } else if (name.indexOf("a") === 0) {
                name = name.replace("a", "").trim();
              } else if (name.indexOf("an") === 0) {
                name = name.replace("an", "").trim();
              }
              return /^\d/.test(name);
            });
            setFilteredProducts(_products);
          }}
        >
          0..9
        </span>
      </div>

      {filteredProducts && <SlickSlider filteredProducts={filteredProducts} onClick={onClick} />}

      <br />
      <br />
      <br />
    </div>
  );
}

ShowCase.propTypes = {
  products: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};
export default ShowCase;
