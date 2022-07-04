import React from "react";
import ContactForm from "../components/ContactForm";
import Footer from "../components/Footer";
import NoSideBarLayout from "../layouts/NoSideBarLayout";
import HeroSection from "../sections/HeroSection";

function ContactScreen() {
  return (
    <NoSideBarLayout>
      <HeroSection heading={"Contact US"} heading2="Home/Contact" image="" />
      <div className="bg-light-dark">
        <ContactForm />
      </div>
      <div className="flex column">
        <iframe
          className={"contact-iframe"}
          title={"Google Map"}
          src="https://www.google.com/maps/embed?pb=!1m24!1m12!1m3!1d39733.188867049495!2d-0.16260549894606588!3d51.50726600940145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!4m9!3e6!4m1!2srigin%3Dmfe%26pb%3D*211m4*212m1*211sLondon*215e0*216i10!4m5!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2z2YTZhtiv2YYg2LPZhNi32YbYqiDZhdiq2K3Yr9uB4oCt!3m2!1d51.5072178!2d-0.12758619999999998!5e0!3m2!1sen!2s!4v1654630076593!5m2!1sen!2s"
          width="600"
          height="450"
          style={{ border: 0, width: "100%" }}
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </NoSideBarLayout>
  );
}

export default ContactScreen;
