import React from 'react';
import SampleImage from '../assets/images/sample.jpg';

function ShowcaseSection() {
  return (
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
          <button type="button" className="button primary">
            Register Now
          </button>
        </div>

        <div className="section start col-md-6 ">
          <img src={SampleImage} alt="" className="img mw-80" />
        </div>
      </div>
      <div className="row start top">
        <div className="section start col-md-6">
          <img src={SampleImage} alt="" className="img mw-80" />
        </div>
        <div className="section start col-md-6">
          <h2>
            <span>Buy and Sell</span> MOVIE POSTERS
          </h2>
          <p>
            As a subscriber you can sell your original movie posters and
            memorabilia to a worldwide collector audience. You will have access
            to a full ecommerce dashboard where you can manage the sales of your
            posters. Simply upload your poster image, fill in the poster
            details, set your own price and your poster will then appear as a
            live product available for anyone to buy via The Art of Film Shop.{' '}
          </p>
          <button type="button" className="button primary">
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ShowcaseSection;
