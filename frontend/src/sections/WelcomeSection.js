import React from "react";
import ShowcaseImage from "../assets/images/Showcase.png";
import SellImage from "../assets/images/Sell.png";

function WelcomeSection() {
  return (
    <div className="section sw">
      <h2>
        <span>WELCOME</span> TO THE ART OF FILM
      </h2>
      <p>
        When you subscribe to The Art of Film you will have access to a unique
        platform that allows you to showcase and manage your movie poster
        collection as well as sell movie posters and memorabilia.
      </p>

      <div className="row mt-2 center">
        <div>
          <img src={ShowcaseImage} alt="" />
          <p>Showcase your movie poster collection</p>
        </div>
        <div>
          <img src={SellImage} alt="" />
          <p>Sell your original movie posters</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
