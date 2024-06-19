import style from "./Logo.module.css";
import React from "react";
import SVGController from "../../assets/svg/SVGController";
import PropTypes from "prop-types";

const Logo = ({ logoStyle, textStyle }) => {
  const defaultLogoStyle = {
    width: "2rem",
    height: "2rem",
  };
  const defaultTextStyle = {
    color: "#1D2026",
    fontSize: "2rem",
    fontStyle: "normal",
    fontWeight: 600,
    lineHeight: "124%" /* 2.48rem */,
    letterSpacing: "-0.06rem",
  };

  const customTextStyle = { ...defaultTextStyle, ...textStyle };

  const customLogoStyle = { ...defaultLogoStyle, ...logoStyle };

  return (
    <a href="/" className={style.logo}>
      <SVGController
        name="GraduationCap"
        stroke="#FF6636"
        width={customLogoStyle.width}
        height={customLogoStyle.height}
      />
      <span className={style.logoText} style={customTextStyle}>
        Sonorus
      </span>
    </a>
  );
};

Logo.propTypes = {
  logoStyle: PropTypes.object,
  textStyle: PropTypes.object,
};

export default Logo;
