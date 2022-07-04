import React from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";

function SectionCard({
  before,
  title,
  text,
  image,
  linkText,
  link,
  type = "image",
}) {
  return (
    <div className="section-card secondary">
      <div
        className={`${isMobile ? "flex column-reverse" : "flex"} between p-4`}
        style={{ maxWidth: "1140px", margin: "0 auto" }}
      >
        <div className="col flex column between">
          <div className="body">
            <h2 className={"text-start"}>
              <span className={"selection"}>{before}</span> {title}
            </h2>
            <p>{text}</p>
          </div>
          <br />
          <br />
          <div className="footer">
            <a
              href={link}
              target={"_blank"}
              className="button primary"
              rel="noreferrer"
            >
              {linkText}
            </a>
          </div>
        </div>
        <div className={isMobile ? "" : "col flex end"}>
          {type === "image" ? (
            <img
              src={image}
              alt=""
              className={`img ${isMobile ? "mw-100" : "mw-80"}`}
            />
          ) : (
            <iframe
              frameBorder="0"
              allowFullScreen="1"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              title="The Art of Film - Coming Soon"
              width="480"
              height="320"
              src="https://www.youtube.com/embed/ofkryTjra7Q?controls=1&amp;rel=0&amp;playsinline=0&amp;modestbranding=0&amp;autoplay=0&amp;enablejsapi=1&amp;origin=https%3A%2F%2Ftheartoffilms.kinsta.cloud&amp;widgetid=1"
            ></iframe>
          )}
        </div>
      </div>
    </div>
  );
}

export default SectionCard;
