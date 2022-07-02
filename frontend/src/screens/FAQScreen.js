import React from "react";
import { isMobile } from "react-device-detect";
import Accordion from "../components/Accordion";

import HeroSection from "../sections/HeroSection";

function FAQScreen({ header = true }) {
  return (
    <div>
      {header && (
        <HeroSection
          heading={"FAQs"}
          heading2="Home/FAQs"
          image="/images/theater.jpeg"
        />
      )}

      <div className="faq-section p-4">
        <div
          className={`faq-item ${isMobile ? "flex column-reverse" : "flex"}`}
        >
          <div className="faq-accordion">
            <h3 className={"title text-start"}>
              <span className="selection">SUBSCRIPTION</span> FAQS
            </h3>
            <div className="accordion">
              <Accordion
                title="Item 1 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 2 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 3 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 4 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
            </div>
          </div>

          <div className="faq-image text-end">
            <img
              src={"/images/faq.jpg"}
              alt=""
              className={`img ${isMobile ? "mw-100" : "mw-80"}`}
            />
          </div>
        </div>

        <div
          className={`faq-item ${
            isMobile ? "flex column-reverse" : "flex row-reverse"
          }`}
        >
          <div className="faq-accordion">
            <h3 className={"title text-start"}>
              <span className="selection">SHOWCASE</span> FAQS
            </h3>
            <div className="accordion">
              <Accordion
                title="Item 1 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 2 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 3 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 4 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
            </div>
          </div>

          <div className="faq-image">
            <img
              src={"/images/faq1.jpg"}
              alt=""
              className={`img ${isMobile ? "mw-100" : "mw-80"}`}
            />
          </div>
        </div>

        <div
          className={`faq-item ${isMobile ? "flex column-reverse" : "flex"}`}
        >
          <div className="faq-accordion">
            <h3 className={"title text-start"}>
              <span className="selection">BUY & SELL</span> FAQS
            </h3>
            <div className="accordion">
              <Accordion
                title="Item 1 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 2 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 3 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
              <Accordion
                title="Item 4 - Lorem ipsum dolor sit amet"
                text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam"
              />
            </div>
          </div>

          <div className="faq-image text-end">
            <img
              src={"/images/faq2.jpg"}
              alt=""
              className={`img ${isMobile ? "mw-100" : "mw-80"}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQScreen;
