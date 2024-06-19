import style from "./FeatureLabel.module.css";
import PropTypes from "prop-types";
import SVGController from "../../../assets/svg/SVGController";
import React from "react";

const FeatureLabel = ({ SVG, FirstText, SecondText, StrokeColor }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.svgContainer}>
        <SVGController
          name={SVG}
          width="1.5rem"
          height="1.5rem"
          stroke={StrokeColor}
        />
        <div className={style.title}>{FirstText}</div>
      </div>
      <div className={style.secondTitle}>{SecondText}</div>
    </div>
  );
};

FeatureLabel.propTypes = {
  SVG: PropTypes.elementType.isRequired,
  FirstText: PropTypes.string.isRequired,
  SecondText: PropTypes.string.isRequired,
  StrokeColor: PropTypes.string.isRequired,
};

export default FeatureLabel;
