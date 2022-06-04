import React from 'react';
import './css/footer.css';
import { Link } from 'react-router-dom';
import ChatBox from '../components/ChatBox';

export default function Footer(props) {
  const userInfo = props;
  return (
    <footer>
      {/* !userInfo.isAdmin && */}
      {userInfo && <ChatBox userInfo={userInfo} />}
      <div className="container footer-top">
        <div className="row top">
          <div className="col md-3">
            <h5 className="mb-3">Get In Touch</h5>
            <div className="icon-with-text mb-1">
              <i className="fa-solid fa-location-dot"></i>
              <span>London, UK</span>
            </div>
            <div className=" icon-with-text mb-3 mt-1">
              <i className="fa-solid fa-envelope"></i>
              <span>henry@theartoffilm.co.uk</span>
            </div>
            <div className="social-icons mb-3">
              <i className="fa-brands fa-facebook"></i>
              <i className="fa-brands fa-instagram"></i>
              <i className="fa-brands fa-youtube"></i>
            </div>
          </div>
          <div className="col md-3">
            <h5 className="mb-3">Things to know</h5>
            <div className="footer-links">
              <Link to="/">Our Subscriptions</Link>
              <Link to="/">Advertise With Us</Link>
              <Link to="/">Posters Condition Grading</Link>
              <Link to="/">Terms & Conditions</Link>
              <Link to="/">Privacy Policy</Link>
            </div>
          </div>
          <div className="col md-3">
            <h5 className="mb-3">Site-map</h5>
            <div className="footer-links">
              <Link to="/">Home</Link>
              <Link to="/">About Us</Link>
              <Link to="/">Shop</Link>
              <Link to="/">Showcase</Link>
              <Link to="/">FAQs</Link>
              <Link to="/">Contact</Link>
            </div>
          </div>
          <div className="col md-3">
            <h5 className="mb-3">Insta Feeds</h5>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>Copyright © 2022 The Art of Film</span>
      </div>
    </footer>
  );
}
