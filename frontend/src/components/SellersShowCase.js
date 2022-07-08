import React, { useEffect } from "react";

import CoverFlowComponent from "./CoverFlow";
import { isMobile } from "react-device-detect";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { sellersList } from "../helpers/profile";

function SellersShowCase() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sellers, setSellers] = React.useState([]);
  useEffect(() => {
    sellersList().then((data) => {
      setSellers((prevSellers) => [...prevSellers, ...data]);
    });
  }, [dispatch]);

  return (
    <div className={"flex column center"}>
      <CoverFlowComponent
        imagesArr={sellers?.map(({ seller }) => seller.logo)}
        direction="horizontal"
        width={`${isMobile ? "100%" : "100%"}`}
        height={`${isMobile ? "100%" : 425}`}
        itemRatio="21:14"
        background="transparent"
        onClick={(seller) => {}}
        handleSelect={(index) => {
          const _seller = sellers?.find((seller, ind) => ind === index);
          navigate(`/seller/${_seller?._id}`);
        }}
        labelsArr={sellers?.map(({ seller }) => seller.name)}
      />
    </div>
  );
}

export default SellersShowCase;
