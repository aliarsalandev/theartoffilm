import React from "react";
import { Link } from "react-router-dom";

import HeroSection from "../sections/HeroSection";

function AdvertiseWithUs() {
  return (
    <div>
      <HeroSection
        heading={"Advertise With Us"}
        heading2=""
        image="/images/banner-1.png"
      />
      <div className="column col-1 center">
        <h3>
          <span>ADVERTISE WITH THE ART OF FILM</span>
        </h3>
        <h2>
          <span>ADVERTISING</span>OPTIONS
        </h2>
        <p>
          You do not have to subscribe in order to advertise with The Art of
          Film. If you have any questions about our advertising options please
          <Link to="/contact-us">Contact Us</Link>
        </p>
      </div>

      <div className="showcase-section">
        <div className="row start top">
          <div className="section start col-md-6">
            <h2>
              <span>Showcase</span> YOUR MOVIE POSTERS
            </h2>
            <p>
              In The Art of Film showcase you can collate, edit and view your
              entire movie poster collection in one place, as well as share a
              single poster image or your whole collection with 1 person or all
              the members in the world.
              <p>
                Once you have subscribed to The Art of Film you will upload and
                manage a minimum of 500 posters with dropdown menus to populate
                with your own collection information.
              </p>
              <p>
                When uploading your poster images to the showcase you select the
                format, country of issue, condition, year of release, cast and
                crew, etc.
              </p>
            </p>
          </div>

          <div className="section start col-md-6 ">
            <img src={"/images/poster-1.jpg"} alt="" className="img mw-80" />
          </div>
        </div>

        <div className="row start top">
          <div className="section start col-md-6">
            <h2>
              <span>Showcase</span> YOUR MOVIE POSTERS
            </h2>
            <p>
              In The Art of Film showcase you can collate, edit and view your
              entire movie poster collection in one place, as well as share a
              single poster image or your whole collection with 1 person or all
              the members in the world.
              <p>
                Once you have subscribed to The Art of Film you will upload and
                manage a minimum of 500 posters with dropdown menus to populate
                with your own collection information.
              </p>
              <p>
                When uploading your poster images to the showcase you select the
                format, country of issue, condition, year of release, cast and
                crew, etc.
              </p>
            </p>
          </div>

          <div className="section start col-md-6 ">
            <img src={"/images/poster-1.jpg"} alt="" className="img mw-80" />
          </div>
        </div>

        <div className="row start top">
          <div className="section start col-md-6">
            <h2>
              <span>Showcase</span> YOUR MOVIE POSTERS
            </h2>
            <p>
              In The Art of Film showcase you can collate, edit and view your
              entire movie poster collection in one place, as well as share a
              single poster image or your whole collection with 1 person or all
              the members in the world.
              <p>
                Once you have subscribed to The Art of Film you will upload and
                manage a minimum of 500 posters with dropdown menus to populate
                with your own collection information.
              </p>
              <p>
                When uploading your poster images to the showcase you select the
                format, country of issue, condition, year of release, cast and
                crew, etc.
              </p>
            </p>
          </div>

          <div className="section start col-md-6 ">
            <img src={"/images/news-paper.png"} alt="" className="img mw-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvertiseWithUs;
