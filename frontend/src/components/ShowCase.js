import React, { useState, useEffect } from "react";

import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";

import propTypes from "prop-types";
import { isMobile } from "react-device-detect";

function ShowCase({ products = [], onClick }) {
  const [filteredProducts, setFilteredProducts] = useState([]);
  useEffect(() => {
    setFilteredProducts(products);
    return () => {};
  }, [products]);

  return (
    <div className={"column center"}>
      <StyleRoot>
        <Coverflow
          className={"coverflow"}
          displayQuantityOfSide={isMobile ? 1 : 2}
          navigation
          enableHeading
          currentFigureScale={1.8}
          otherFigureScale={1}
          media={{
            "@media (max-width: 900px)": {
              width: "100%",
              height: "420px",
            },
            "@media (min-width: 900px)": {
              width: "100%",
              height: "420px",
            },
          }}
        >
          {filteredProducts.map((product, index) => (
            <img
              key={product._id}
              onClick={() => {
                onClick(product);
              }}
              src={product.image}
              alt={product.name}
            />
          ))}
        </Coverflow>
      </StyleRoot>

      <div className="row p-2 pagination">
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
    </div>
  );
}

ShowCase.propTypes = {
  products: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};
export default ShowCase;
