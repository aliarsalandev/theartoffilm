import React from "react";
import { Link } from "react-router-dom";
import { useCurrency, useSymbol } from "../hooks/currencyHooks";

export default function Product({ product, toshop = false }) {
  const { currency, rates } = useCurrency();
  const symbol = useSymbol(currency);

  return (
    <div key={product._id} className="flex column start top card bg-dark ">
      <Link
        to={toshop ? `/shop/name/${product.name}` : `/product/${product._id}`}
      >
        <div
          title={product.name}
          style={{ height: "240px", width: "240px", overflow: "hidden" }}
        >
          <img
            style={{
              height: "240px",
              width: "240px",
              objectFit: "fill",
              overflow: "hidden",
            }}
            src={product.image.replace(/\\/, "/")}
            alt={product.name}
          />
        </div>
      </Link>
      <div className="card-body">
        <div className="flex row">
          <Link
            style={{
              fontSize: "24px",
              wordBreak: "break-word",
              maxWidth: "280px",
            }}
            to={`/product/${product._id}`}
          >
            {product.name}
          </Link>
        </div>
        {/* <Rating
          rating={product.rating}
          numReviews={product.numReviews}
        ></Rating> */}
        <div className="row">
          <div className="price">
            {symbol} {(rates[currency] * product.price).toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}
