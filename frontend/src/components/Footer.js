import React from "react";
import "./css/footer.css";
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";
import InstagramFeed from "react-ig-feed";
import "react-ig-feed/dist/index.css";

export default function Footer(props) {
  return (
    <footer>
      <div className="container plr-2 ptb-2">
        <div className={`${isMobile ? "column top" : "flex between top"}`}>
          <div className="col md-3">
            <h3 className="mb-3">Get In Touch</h3>
            <div className="footer-links">
              <div className="icon-with-text mb-1">
                <i className="fa-solid fa-location-dot"></i>
                <span>London, UK</span>
              </div>
              <div className=" icon-with-text mb-3 mt-1">
                <i className="fa-solid fa-envelope"></i>
                <span>henry@theartoffilm.co.uk</span>
              </div>
            </div>

            <div className="social-icons">
              <a
                href="https://www.facebook.com/Henry4film/"
                target={"_blank"}
                rel="noreferrer"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>

              <a
                href="https://www.instagram.com/the_artoffilm/?utm_medium=copy_link"
                target={"_blank"}
                className={"plr-2"}
                rel="noreferrer"
              >
                <i className="fa-brands fa-instagram"></i>
              </a>

              <a
                href="https://www.youtube.com/channel/UCYDDoM6EPQryVyCzW9G-Ryg"
                target={"_blank"}
                rel="noreferrer"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
            </div>
          </div>
          <div className="col md-3">
            <h3 className="mb-3">Things to know</h3>
            <div className="footer-links">
              <Link to="/page/subscriptions">Subscribe</Link>
              <Link to="/advertise-with-us">Advertise With Us</Link>
              <Link to="/poster-grading-categories">
                Posters Condition Grading
              </Link>
              <Link to="/terms">Terms & Conditions</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
          <div className="col md-3">
            <h3 className="mb-3">Site-map</h3>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/about-us">About Us</Link>
              <Link to="/shop/name">Shop</Link>
              <Link to="/sellers">Showcase</Link>
              <Link to="/faq">FAQs</Link>
              <Link to="/contact">Contact</Link>
            </div>
          </div>
          <div className="col md-3">
            <h3 className="mb-3">NEWS & BLOG FEED</h3>
            <div className="footer-links">
              <Link to="/grahamhumpreys">Graham Humphreys</Link>
              <Link to="/why-film-posters">Why Film Posters?</Link>
            </div>
          </div>
          <div className="flex column col md-3">
            <h3 className="mb-3">Insta Feeds</h3>
            <div>
              <InstagramFeed
                token={
                  "EAADnl4w17Q8BAPvriAK3SdLL7smNeL4ZAi17IvetyC8ZC77accQnTTeMPqMVgNo7Nx67W4SEbcs48px2jKPeD6LvJTZCoWGrE0oIDhJomItBqFlYwrlrP7b0dFnTM9kM01xdarqoPgI7TrOMkckkMqp9ILBaWd38rDMCm5HLWfJxkYyWIhS"
                }
                counter="6"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="text-md footer-bottom">
        <div className="container">
          <div>
            <span className={"text-small"}>
              Copyright ?? 2022 The Art of Film
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
