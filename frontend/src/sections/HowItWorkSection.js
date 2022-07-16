import React from 'react';
import HowOneImage from '../assets/images/How-1.jpg';
import HowTwoImage from '../assets/images/How-2.png';
import HowThreeImage from '../assets/images/How-3.jpg';

function HowItWorkSection() {
  return (
    <div className="section " style={{ padding: '4em' }}>
      <h2>
        <span>How</span> It Works
      </h2>
      <br />
      <br />
      <div className="row center mt-2 image-box">
        <div className="col item">
          <img src={HowOneImage} alt="" />
          <h4>CHOOSE YOUR SUBSCRIPTION</h4>
        </div>
        <div className="col item mlr-2">
          <img src={HowTwoImage} alt="" />
          <h4>Create your account</h4>
        </div>
        <div className="col item">
          <img src={HowThreeImage} alt="" />
          <h4>Upload your movie posters</h4>
        </div>
      </div>
    </div>
  );
}

export default HowItWorkSection;
