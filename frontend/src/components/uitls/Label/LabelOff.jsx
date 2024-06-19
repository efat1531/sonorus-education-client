import style from "./LabelOff.module.css";
import React from "react";
import PropTypes from "prop-types";

const LabelOff = ({ percentage }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.labelOff}>{Math.round(percentage)}%&nbsp;off</div>
    </div>
  );
};

LabelOff.propTypes = {
  percentage: PropTypes.number.isRequired,
};

export default LabelOff;
