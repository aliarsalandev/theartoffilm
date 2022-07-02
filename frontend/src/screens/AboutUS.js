import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import HeroSection from "../sections/HeroSection";

function AboutUS() {
  return (
    <div>
      <HeroSection
        heading={"About Us"}
        heading2=""
        image="/images/About-Us.png"
      />
      <div className="flex column column-center ptb-4">
        <h3 className={"title2"}>
          <span className={"selection"}>ADVERTISE WITH THE ART OF FILM</span>
        </h3>
        <h1 className={"title"}>
          <span className={"selection"}>ADVERTISING</span> OPTIONS
        </h1>
        <p style={{ maxWidth: isMobile ? "90%" : "60%", textAlign: "center" }}>
          You do not have to subscribe in order to advertise with The Art of
          Film. If you have any questions about our advertising options please
          <Link to="/contact-us"> Contact Us</Link>
        </p>
      </div>

      <div className="showcase-section p-2">
        <div className="p-2">
          <div className="row start top">
            <div className="section start col-md-6 col-xs-12">
              <div className="p-2">
                <h2>
                  <span>Showcase</span> YOUR MOVIE POSTERS
                </h2>
                <p>
                  In The Art of Film showcase you can collate, edit and view
                  your entire movie poster collection in one place, as well as
                  share a single poster image or your whole collection with 1
                  person or all the members in the world.
                </p>
                <p>
                  Once you have subscribed to The Art of Film you will upload
                  and manage a minimum of 500 posters with dropdown menus to
                  populate with your own collection information.
                </p>
                <p>
                  When uploading your poster images to the showcase you select
                  the format, country of issue, condition, year of release, cast
                  and crew, etc.
                </p>
                <p>
                  <span>
                    Contact Henry Coleman the author
                    <a
                      className="selection"
                      href="mailto:henrhenry@theartoffilm.co.uk"
                    >
                      {" "}
                      henry@theartoffilm.co.uk
                    </a>
                  </span>
                </p>
              </div>
            </div>

            <div className="section start col-md-6 col-xs-12">
              <div className={isMobile ? "" : "p-2"}>
                <img
                  src={"/images/poster-1.jpg"}
                  alt=""
                  className={`img ${isMobile ? "w-100" : "w-80"}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <div className="row start top">
            <div className="section start col-md-6 col-xs-12">
              <div className="p-2">
                <h2>
                  <span>Showcase</span> YOUR MOVIE POSTERS
                </h2>
                <p>
                  In The Art of Film showcase you can collate, edit and view
                  your entire movie poster collection in one place, as well as
                  share a single poster image or your whole collection with 1
                  person or all the members in the world.
                </p>
                <p>
                  Once you have subscribed to The Art of Film you will upload
                  and manage a minimum of 500 posters with dropdown menus to
                  populate with your own collection information.
                </p>
                <p>
                  When uploading your poster images to the showcase you select
                  the format, country of issue, condition, year of release, cast
                  and crew, etc.
                </p>
                <p>
                  <span>
                    Contact Henry Coleman the author
                    <a
                      className="selection"
                      href="mailto:henrhenry@theartoffilm.co.uk"
                    >
                      {" "}
                      henry@theartoffilm.co.uk
                    </a>
                  </span>
                </p>
              </div>
            </div>

            <div className="section start col-md-6 col-xs-12">
              <div className={isMobile ? "" : "p-2"}>
                <img
                  src={"/images/poster-1.jpg"}
                  alt=""
                  className={`img ${isMobile ? "w-100" : "w-80"}`}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="row start top">
          <div className="section start col-md-6 col-xs-12">
            <div className="p-2">
              <h2>
                <span>Showcase</span> YOUR MOVIE POSTERS
              </h2>
              <p>
                In The Art of Film showcase you can collate, edit and view your
                entire movie poster collection in one place, as well as share a
                single poster image or your whole collection with 1 person or
                all the members in the world.
              </p>
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
              <p>
                <span>
                  Contact Henry Coleman the author
                  <a
                    className="selection"
                    href="mailto:henrhenry@theartoffilm.co.uk"
                  >
                    {" "}
                    henry@theartoffilm.co.uk
                  </a>
                </span>
              </p>
            </div>
          </div>

          <div className="section start col-md-6 col-xs-12">
            <div className={isMobile ? "" : "p-2"}>
              <img
                src={"/images/news-paper.png"}
                alt=""
                className={`img ${isMobile ? "w-100" : "w-80"}`}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUS;
