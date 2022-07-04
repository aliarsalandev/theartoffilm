import React from "react";
import SellerSidebar from "../components/SellerSidebar";

function PageLayout(props) {
  return (
    <div className={"flex row top bg-light-dark"}>
      <div className="col-1" style={{ height: "100%" }}>
        <SellerSidebar />
      </div>
      <div className={"ml-3 col-3 bg-light-dark"}>{props.children}</div>
    </div>
  );
}

export default PageLayout;
