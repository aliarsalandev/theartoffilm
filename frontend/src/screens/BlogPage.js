import React from "react";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

import HeroSection from "../sections/HeroSection";
import NoSideBarLayout from "../layouts/NoSideBarLayout";

function BlogPage() {
  return (
    <NoSideBarLayout>
      <HeroSection
        heading={"Why Film Posters?"}
        heading2=""
        image="/images/Henry-Bedroom-2-1.jpg"
      />

      <div className="showcase-section p-2 bg-light-dark">
        <div className="row start top">
          <div className="section start col-md-6 col-xs-12">
            <div className="p-2">
              <h2 className={"title2 text-start"}>
                <span className="selection">PASSIONATE</span> FILM POSTER
                COLLECTOR
              </h2>
              <p style={{ lineHeight: "2em" }}>
                There are 3 main reasons why I collect film posters – firstly I
                love the artwork that encapsulates the film – as soon as you
                look at a specific poster, the film comes flooding back to you.
                We all have our favourite movies – some of mine include Zulu,
                Lawrence of Arabia, Monty Python and the Holy Grail, Jaws, 2001
                A Space Odyssey, Star Wars, Close Encounters of the Third Kind,
                Raiders of the Lost Ark and many more of course, and I am lucky
                enough to have all these original cinema release posters in my
                collection – some in multiple formats from around the world.
                Secondly the original poster artists created such iconic images
                that are recognisable around the world. Secondly, a lot of
                classic titles are valuable or are becoming more valuable over
                time. So they are investment pieces as well as works of art. And
                thirdly, I just love looking at them framed up on my walls. It
                gives me a sense of joy to see a favourite original film poster
                displayed as they were designed to do. I suppose I would really
                love my own independent cinema – all the décor and posters would
                be treated with utmost love and respect – one day I will build
                my own home cinema! Contact Henry Coleman the author
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
                src={"/images/Henry-Bedroom-1.jpg"}
                alt=""
                className={`img ${isMobile ? "w-100" : "w-80"}`}
              />
            </div>
          </div>
        </div>

        <div className="row start top p-2">
          <div className={"section start col-md-6 col-xs-12"}>
            <div className="row start top">
              <img
                src={"/images/Henry-Bedroom-2-1024x688.jpg"}
                alt=""
                className={`img ${isMobile ? "w-100" : "w-80"}`}
              />
            </div>
          </div>

          <div className="section start col-md-6 col-xs-12">
            <h2 className={"title2 text-start"}>
              <span className="selection">Film</span> POSTER COLLECTION
            </h2>
            <p style={{ lineHeight: "2em" }}>
              So today, my original film poster collection stretches to over 600
              titles from around the world – I love the UK quad format, but I
              also have many US 1 sheets, French grandes and petites, Italian
              photobustas and locandinas, Australian Daybills and Japanese B2
              format posters, ranging in date from the 1930s to the modern-day.
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

        <div className="p-2">
          <div className="row start top">
            <div className="p-2">
              <h2 className={"title2"}>
                <span className="selection">THE</span> ART OF FILM
              </h2>
              <p style={{ lineHeight: "2em" }}>
                I have founded The Art of Film as a complete umbrella website
                for all movie poster collectors from around the world – I have
                found it quite frustrating over the years to not be able to
                collate my entire collection as well as speak to other
                collectors and buy and sell all under 1 virtual roof! Now it
                will be possible - it will be THE place for you to add your
                whole poster collection and share it with 1 person, the whole
                world, or no one at all – keep it totally private. You will also
                be able to upload all your original movie posters for sale, set
                your own price and have all the other collectors around the
                world view it and purchase directly from you. There will also be
                a link list of film poster stores around the world, so you can
                quickly access their stock. The Art of Film is designed for
                serious film poster collectors globally, to showcase your
                collections and to buy and sell orginal movie posters. I look
                forward to your support – you will make The Art of Film a film
                poster force to be reckoned with! Contact Henry Coleman the
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
        </div>
      </div>
    </NoSideBarLayout>
  );
}

export default BlogPage;
