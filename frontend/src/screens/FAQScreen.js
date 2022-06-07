import React from "react";
import { Link } from "react-router-dom";
import Accordion from "../components/Accordion";

import HeroSection from "../sections/HeroSection";

function FAQScreen() {
  return (
    <div>
      <HeroSection
        heading={"FAQs"}
        heading2="Home/FAQs"
        image="/images/theater.jpeg"
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

      <div className="faq-section">
        <div className="row start top">
          <div className="section start col-md-6">
            <h2>SUBSCRIPTION FAQS</h2>
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

          <div className="section start col-md-6 ">
            <img src={"/images/poster-1.jpg"} alt="" className="img mw-80" />
          </div>
        </div>

        <div className="row row-reverse start top">
          <div className="section start col-md-6">
            <h2>SHOWCASE FAQS</h2>
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

          <div className="section start col-md-6 ">
            <img src={"/images/poster-1.jpg"} alt="" className="img mw-80" />
          </div>
        </div>

        <div className="row start top">
          <div className="section start col-md-6">
            <h2>BUY & SELL FAQS</h2>
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

          <div className="section start col-md-6 ">
            <img src={"/images/poster-1.jpg"} alt="" className="img mw-80" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FAQScreen;
