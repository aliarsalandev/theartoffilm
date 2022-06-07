import React from "react";

import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";

import propTypes from "prop-types";

function ShowCase({ products, onClick }) {
  return (
    <StyleRoot>
      <Coverflow
        className={"coverflow"}
        displayQuantityOfSide={2}
        navigation
        enableHeading
        media={{
          "@media (max-width: 900px)": {
            width: "600px",
            height: "400px",
          },
          "@media (min-width: 900px)": {
            width: "960px",
            height: "600px",
          },
        }}
      >
        {products.map((product, index) => (
          <img
            onClick={() => {
              onClick(product);
            }}
            src={product.image}
            alt={product.name}
          />
        ))}
      </Coverflow>
    </StyleRoot>
  );
}

ShowCase.propTypes = {
  products: propTypes.array.isRequired,
  onClick: propTypes.func.isRequired,
};
export default ShowCase;
