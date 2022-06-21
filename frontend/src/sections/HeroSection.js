import React from "react";
import propTypes from "prop-types";
import SearchBox from "../components/SearchBox";

function Hero({
  heading = "The Art Of FIlm",
  heading2 = "A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT",
  image = "",
  showSearch = false,
}) {
  return (
    <div
      className="section fh"
      style={{
        position: "relative",
        backgroundImage: `url(${image})`,
      }}
    >
      <h1>{heading}</h1>
      {heading2 && <h2>{heading2}</h2>}
      {showSearch && (
        <div className="">
          <div>
            <SearchBox />
          </div>
        </div>
      )}
      <div className="layer"></div>
    </div>
  );
}

Hero.defaultProps = {
  heading: "The Art Of Film",
  heading2: "A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT",
  image: "",
  showSearch: false,
};
Hero.propTypes = {
  heading: propTypes.string.isRequired,
  heading2: propTypes.string.isRequired,
  image: propTypes.string.isRequired,
  showSearch: propTypes.bool.isRequired,
};
export default Hero;
