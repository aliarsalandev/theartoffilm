import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import HeroSection from "../sections/HeroSection";
import NoSideBarLayout from "../layouts/NoSideBarLayout";

function PosterGradingCategoriesPage() {
  return (
    <NoSideBarLayout>
      <div className="showcase-section p-2 pt-4 bg-light-dark">
        <div className={"p-2 text-center"}>
          <h1 className={"title"}>
            <span className="selection">POSTER GRADING</span>
          </h1>
          <p>
            Collectors using The Art of Film must ensure all posters are grading
            using this 6 point poster grading system.
          </p>
        </div>

        <div className="p-2">
          <div className="flex wrap center container top">
            {[
              {
                title: "MINT",
                text: "A totally unused, un-displayed poster with pristine edges, no handling marks, fingerprints etc. This category should be rarely used unless it is immaculate in every way.",
              },
              {
                title: "NEAR MINT",
                text: "This poster should be virtually unused with only the slightest flaws visible – maybe tiny amounts of edge ware, some handling marks etc.",
              },
              {
                title: "VERY FINE",
                text: "Slight signs of use but not major wear and tear. Single corner pinholes, minor dings and edge wear would fall under here.",
              },
              {
                title: "VERY GOOD",
                text: "An average used / displayed poster with edge scuffing, pinholes, light wear, some dings etc – will still display well.",
              },
              {
                title: "GOOD",
                text: "Used with tears, significant pinholes, fold separation, tape or tape burns on the front, marking on image, pen marks showing through from back etc. Poster could use some TLC or restoration.",
              },
              {
                title: "POOR",
                text: "Poster is badly torn, missing paper, image is very faded, handwriting on significant part of poster, not worth displaying – would need major restoration.",
              },
            ].map(({ title, text }, index) => (
              <div className="small-card" key={index}>
                <h2 className="card-title">{title}</h2>
                <p className="card-text">{text}</p>
              </div>
            ))}
          </div>

          <div className={"p-2 text-center"}>
            <p>
              Contact Henry Coleman the author
              <a
                className="selection"
                href="mailto:henrhenry@theartoffilm.co.uk"
              >
                {" "}
                henry@theartoffilm.co.uk
              </a>
            </p>
          </div>
        </div>
      </div>
    </NoSideBarLayout>
  );
}

export default PosterGradingCategoriesPage;
