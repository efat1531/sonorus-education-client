import style from "./ButtonTemplate.module.css";
import PropTypes from "prop-types";
import React from "react";

const ButtonTemplate = ({ width, backgroundColor, btnText, btnTextColor }) => {
  return (
    <button
      className={style.mainContainer}
      style={{ backgroundColor: `${backgroundColor}`, width: `${width}` }}
    >
      <span style={{ color: `${btnTextColor}` }}>{btnText}</span>
    </button>
  );
};

ButtonTemplate.propTypes = {
  padding: PropTypes.string,
  width: PropTypes.string,
  backgroundColor: PropTypes.string,
  btnText: PropTypes.string,
  btnTextColor: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonTemplate;
