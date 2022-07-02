import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import SampleImage from "../assets/images/sample.jpg";

function ShowCaseCard({
  before,
  title,
  text,
  link,
  linkText,
  image,
  reverse = false,
}) {
  return (
    <div className={`flex between ${reverse ? "row-reverse" : ""} mtb-2`}>
      <div className="col-md-6 col-xs-12 plr-2">
        <h2>
          <span className={"selection"}>{before}</span> {title}
        </h2>
        <p>{text}</p>
        <Link to={link} className="button primary">
          {linkText}
        </Link>
      </div>
      <div className={`col flex ${reverse ? "start" : "end"}`}>
        <img
          src={image}
          alt=""
          className={`img ${isMobile ? "w-100" : "w-80"}`}
        />
      </div>
    </div>
  );
}

function ShowcaseSection() {
  return (
    <div className="showcase-section p-4">
      <ShowCaseCard
        before={"Showcase"}
        title={"your Movie Posters"}
        text={
          "Manage and showcase your movie collection. Once you have subscribed to The Art of Film you will have access to a minimum of 500 blank template pages with dropdown menus to populate with your own collection information. Choose the format, country of issue, condition, year of release, cast, and crew, etc. You can then choose to keep movie posters in your own private collection and/or you can choose to sell posters through our Movie Poster Shop."
        }
        image={SampleImage}
        link={"/"}
        linkText={"Register Now"}
      />

      <ShowCaseCard
        reverse
        before={"Manage"}
        title={"your Poster Collection"}
        text={
          "Manage and showcase your movie collection. Once you have subscribed to The Art of Film you will have access to a minimum of 500 blank template pages with dropdown menus to populate with your own collection information"
        }
        image={SampleImage}
        link={"/"}
        linkText={"Register Now"}
      />

      <ShowCaseCard
        before={"BUY AND SELL"}
        title={"YOUR MOVIE POSTERS"}
        text={
          "Buy and sell your original movie posters with The Art of Film. Anyone visiting the site will also have the facility to buy your posters. If you have a poster to sell, you add it to the Movie Poster Shop and where site users can see your post and contact you directly to purchase the poster. Over time, The Art of Film will establish an archive of sold titles, so as a subscriber you will be able to go back and see sold poster images as well as see how much it sold for and when. condition, year of release, cast, and crew, etc. You can then choose to keep movie posters in your own private collection and/or you can choose to sell posters through our Movie Poster Shop."
        }
        image={SampleImage}
        link={"/"}
        linkText={"Register Now"}
      />
    </div>
  );
}

export default ShowcaseSection;
