import React from "react";
import { isMobile } from "react-device-detect";

import HeroSection from "../sections/HeroSection";

function AdvertiseWithUs() {
  return (
    <div className={"bg-light-dark"}>
      <HeroSection
        heading={"Advertise With Us"}
        heading2=""
        image="/images/banner-1.png"
      />
      <div className="flex column column-center ptb-4 bg-dark">
        <h5 className={"text-md"}>
          <span className={"selection"}>ADVERTISE WITH</span> THE ART OF FILM
        </h5>
        <h2 className={"title2"}>
          <span className="selection">ADVERTISING</span> OPTIONS
        </h2>
        <br />
        <p style={{ maxWidth: isMobile ? "90%" : "60%", textAlign: "center" }}>
          You do not have to subscribe in order to advertise with The Art of
          Film. If you have any questions about our advertising options please
          Contact Henry Coleman the author
          <a className="" href="mailto:henrhenry@theartoffilm.co.uk">
            {" "}
            henry@theartoffilm.co.uk
          </a>
        </p>
      </div>

      <div className="showcase-section p-2 bg-light-dark">
        <div className="p-2">
          <div className="row start top">
            <div className="section start col-md-6 col-xs-12">
              <div className="p-2">
                <h2 className={"text-start"}>
                  <span className={"selection"}>SPONSORED</span> LINKS
                </h2>
                <p>
                  Sponsored Links are external links embedded in an image that
                  links directly to your website. These links will appear on
                  multiple pages throughout our Site. Each sponsored link is
                  priced at £25 per month or £250 for a year (2 months free).
                  Please select your preference when you ‘Add to Cart’. Once you
                  have purchased your sponsored link a member of The Art of Film
                  will be in touch to discuss the requirements and artwork for
                  your advert. Contact Henry Coleman the author
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
                <h2 className={"text-start"}>
                  <span className={"selection"}>HOMEPAGE</span> BANNER
                </h2>
                <p>
                  Advertise your business on The Art of Film homepage. Homepage
                  advertisements are slightly larger than web listings, however
                  there is limited premium space available. The price of a
                  homepage banner is £350 per year. Once you have purchased your
                  homepage advertising a member of The Art of Film will be in
                  touch to discuss the artwork for your advert.
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
              <h2 className={"text-start"}>
                <span className={"selection"}>ADVERTORIAL</span>
              </h2>
              <p>
                Create an advertorial for your business and have this appear as
                a homepage feature, a blog and it will also be pushed on all The
                Art of Film social media platforms. The content of your
                advertorial must include valuable content for movie poster
                enthusiasts and will include links directly to your website. The
                price of an advertorial is £500. Once you have purchased your
                advertorial a member of The Art of Film will be in touch to
                discuss the artwork for your advert. Contact Henry Coleman the
                author
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

export default AdvertiseWithUs;
