import React from "react";
import ShowcaseImage from "../assets/images/Showcase.png";
import SellImage from "../assets/images/Sell.png";

function WelcomeSection() {
  return (
    <div className="section sw" style={{ padding: "5em 0" }}>
      <h2 className={"title2"}>
        <span>WELCOME</span> TO THE ART OF FILM
      </h2>
      <p>
        When you subscribe to The Art of Film you will have access to a unique
        platform that allows you to showcase and manage your movie poster
        collection as well as sell movie posters and memorabilia.
      </p>

      <div className="flex row mt-2 between">
        <div className={"m-2"}>
          <img src={ShowcaseImage} alt="" />
          <p>Showcase your movie poster collection</p>
        </div>
        <div className={"m-2"}>
          <img src={SellImage} alt="" />
          <p>Sell your original movie posters</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
