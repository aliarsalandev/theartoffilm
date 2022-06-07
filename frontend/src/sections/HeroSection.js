import React from "react";

function Hero({
  heading = "The Art Of FIlm",
  heading2 = "A MOVIE POSTER COLLECTOR’S INDISPENSABLE TOOLKIT",
  image = "",
}) {
  return (
    <div className="section fh" style={{
      backgroundImage: `url(${image})`
    }}>
      <h1>{heading}</h1>
      <h2>{heading2}</h2>
    </div>
  );
}

export default Hero;
