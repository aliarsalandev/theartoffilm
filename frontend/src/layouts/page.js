import React from "react";
import SellerSidebar from "../components/SellerSidebar";

function PageLayout(props) {
  return (
    <div className={"row top"}>
      <div className="col-1">
        <SellerSidebar />
      </div>
      <div className={"ml-3 col-3"}>{props.children}</div>
    </div>
  );
}

export default PageLayout;
