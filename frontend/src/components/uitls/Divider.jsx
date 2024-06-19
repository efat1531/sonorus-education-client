import style from "./Divider.module.css";
import PropTypes from "prop-types";
import React from "react";

const Divider = ({ width = "26.5rem" }) => {
  return (
    <div className={style.mainContainer} style={{ width: `${width}` }}></div>
  );
};

Divider.propTypes = {
  width: PropTypes.string,
};

export default Divider;
