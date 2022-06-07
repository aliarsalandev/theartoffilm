import React from "react";
import SampleImage from "../assets/images/sample.jpg";

function ShowcaseSection() {
  return (
    <div className="showcase-section">
      <div className="row start top">
        <div className="section start col-md-6 col-xs-12">
          <h2>
            <span>Showcase</span> your Movie Posters
          </h2>
          <p>
            Manage and showcase your movie collection. Once you have subscribed
            to The Art of Film you will have access to a minimum of 500 blank
            template pages with dropdown menus to populate with your own
            collection information. Choose the format, country of issue,
            condition, year of release, cast, and crew, etc. You can then choose
            to keep movie posters in your own private collection and/or you can
            choose to sell posters through our Movie Poster Shop.
          </p>
          <button type="button" className="button primary">
            Register Now
          </button>
        </div>
        <div className="section start col-md-6 col-xs-12">
          <img src={SampleImage} alt="" className="img mw-80" />
        </div>
      </div>
      <div className="row start top">
        <div className="section start col-md-6 col-xs-12">
          <img src={SampleImage} alt="" className="img mw-80" />
        </div>

        <div className="section start col-md-6 col-xs-12">
          <h2>
            <span>Manage</span> your Poster Collection
          </h2>
          <p>
            Manage and showcase your movie collection. Once you have subscribed
            to The Art of Film you will have access to a minimum of 500 blank
            template pages with dropdown menus to populate with your own
            collection information.
          </p>
          <button type="button" className="button primary">
            Register Now
          </button>
        </div>
      </div>
      <div className="row start top">
        <div className="section start col-md-6 col-xs-12">
          <h2>
            <span>Buy and Sell</span> MOVIE POSTERS
          </h2>
          <p>
            Buy and sell your original movie posters with The Art of Film.
            Anyone visiting the site will also have the facility to buy your
            posters. If you have a poster to sell, you add it to the Movie
            Poster Shop and where site users can see your post and contact you
            directly to purchase the poster. Over time, The Art of Film will
            establish an archive of sold titles, so as a subscriber you will be
            able to go back and see sold poster images as well as see how much
            it sold for and when. condition, year of release, cast, and crew,
            etc. You can then choose to keep movie posters in your own private
            collection and/or you can choose to sell posters through our Movie
            Poster Shop.
          </p>
        </div>
        <div className="section start col-md-6 col-xs-12">
          <img src={"/images/buy-sell.jpg"} alt="" className="img mw-80" />
        </div>
      </div>
    </div>
  );
}

export default ShowcaseSection;
