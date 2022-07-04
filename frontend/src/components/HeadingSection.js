import React from "react";
import propTypes from "prop-types";

const HeadingSection = ({ small, title }) => {
  return (
    <div className={"text-center"}>
      <h2 className={"title2"}>
        <span className={"selection"}>{small}</span> {title}
      </h2>
    </div>
  );
};

HeadingSection.prototype = {
  small: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
};
export default HeadingSection;
