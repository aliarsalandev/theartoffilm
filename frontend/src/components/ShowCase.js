import React, { useState, useEffect } from "react";

import propTypes from "prop-types";
import CoverFlowComponent from "./CoverFlow";
import { isMobile } from "react-device-detect";

function ShowCase({ products = [], onClick }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setFilteredProducts(products);
    return () => {};
  }, [products]);

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
            const _products = products.filter((product) => {
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

      <CoverFlowComponent
        products={filteredProducts}
        imagesArr={filteredProducts.map((product) => product.image)}
        direction="horizontal"
        width={`${isMobile ? "100%" : "100%"}`}
        height={`${isMobile ? "100%" : 425}`}
        itemRatio="21:14"
        background="transparent"
        onClick={onClick}
        handleSelect={(index) => {
          const product = filteredProducts.find(
            (product, ind) => ind === index
          );
          onClick(product);
        }}
        labelsArr={filteredProducts.map((product) => product.name)}
      />
    </div>
  );
}

ShowCase.propTypes = {
  products: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};
export default ShowCase;
