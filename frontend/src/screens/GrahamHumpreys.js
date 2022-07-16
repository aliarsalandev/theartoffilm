import React from "react";
import { isMobile } from "react-device-detect";
import SellersShowCase from "../components/SellersShowCase";
import NoSideBarLayout from "../layouts/NoSideBarLayout";

function ShowCaseCard({ before, title, text, image, reverse = false }) {
  return (
    <div className={`flex between ${reverse ? "row-reverse" : ""} mtb-2`}>
      <div className={`col-md-6 col-xs-12 ${isMobile ? "" : "plr-2"}`}>
        <h2 className={"text-start"}>
          <span className={"selection"}>{before}</span> {title}
        </h2>
        <p>{text}</p>
      </div>
      <div className={`col flex ${reverse ? "start" : "end"} border-accent`}>
        <img
          src={image}
          alt=""
          className={`img ${isMobile ? "w-100" : "w-100"}`}
        />
      </div>
    </div>
  );
}

function GrahamHumpreys() {
  return (
    <NoSideBarLayout>
      <div
        className="container showcase-section p-4"
        style={{ padding: "4em" }}
      >
        <div className="p-4">
          <ShowCaseCard
            before={"GRAHAM"}
            title={"HUMPHREYS"}
            text={
              "Film poster illustrator Graham Humphreys is a highly acclaimed and talented artist and graphics illustrator. We are proud to announce that we have recently interviewed Graham about his movie poster designs and lifetime achievements."
            }
            image={"/images/Graham-Humphreys.jpg"}
            link={"/"}
            linkText={"Register Now"}
          />
        </div>

        <div className="p-4">
          <ShowCaseCard
            reverse
            before={"GRAHAM"}
            title={"H. WORK"}
            text={
              "Graham designed the artwork for the UK releases of The Evil Dead and the Evil Dead II as well as all the British posters for The Nightmare on Elm Street series and other posters for cinema release, video, VHS and DVD & Bluray covers."
            }
            image={"/images/Graham-H-work.jpg"}
          />
        </div>
      </div>
      <div className={"p-4"}>
        <SellersShowCase />
      </div>
    </NoSideBarLayout>
  );
}

export default GrahamHumpreys;
