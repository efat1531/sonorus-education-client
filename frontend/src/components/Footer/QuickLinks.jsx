import style from "./QuickLinks.module.css";
import Proptypes from "prop-types";
import React from "react";
const QuickLinks = ({ label }) => {
  return (
    <div className={style.quickLink}>
      <div>{label}</div>
    </div>
  );
};

QuickLinks.propTypes = {
  label: Proptypes.string.isRequired,
};

export default QuickLinks;
