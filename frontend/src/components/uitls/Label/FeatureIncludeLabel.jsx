import style from "./FeatureIncludeLabel.module.css";
import SVGController from "../../../assets/svg/SVGController";
import PropType from "prop-types";
import React from "react";

const FeatureIncludeLabel = ({ svgName, messgae }) => {
  return (
    <div className={style.mainContainer}>
      <SVGController
        name={svgName}
        width="1.5rem"
        height="1.5rem"
        stroke="#FF6636"
      />
      <div className={style.text}>{messgae}</div>
    </div>
  );
};

FeatureIncludeLabel.propTypes = {
  svgName: PropType.string.isRequired,
  messgae: PropType.string.isRequired,
};

export default FeatureIncludeLabel;
