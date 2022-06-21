import React from "react";
import propTypes from "prop-types";

const HeadingSection = ({ small, title }) => {
  return (
    <div className={"text-center"}>
      <h4>
        <span className={"selection"}>{small}</span>
      </h4>
      <h1>
        <span>{title}</span>
      </h1>
    </div>
  );
};

HeadingSection.prototype = {
  small: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};
export default HeadingSection;
