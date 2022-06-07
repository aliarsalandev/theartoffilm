import React from "react";

import Coverflow from "react-coverflow";
import { StyleRoot } from "radium";

import propTypes from "prop-types";
import { isMobile } from "react-device-detect";

function ShowCase({ products, onClick }) {
  return (
    <StyleRoot>
      <Coverflow
        className={"coverflow"}
        displayQuantityOfSide={isMobile ? 1 : 2}
        navigation
        enableHeading
        currentFigureScale={2}
        otherFigureScale={1}
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
