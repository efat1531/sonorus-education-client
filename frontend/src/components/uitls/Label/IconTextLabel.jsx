import SVGController from "../../../assets/svg/SVGController";
import PropTypes from "prop-types";
import React from "react";

const IconTextLabel = ({ text, textStyle, iconStyle }) => {
  const defaultTextStyle = {
    color: "#4E5566",
    fontFamily: "Inter",
    fontSize: "0.875rem",
    fontStyle: "normal",
    fontWeight: 400,
    lineHeight: "1.375rem",
    letterSpacing: "-0.00875rem",
  };
  const defaultIconStyle = {
    name: "Star",
    width: "1.5rem",
    height: "1.5rem",
    stroke: "none",
    fill: "none",
  };

  const finalTextStyle = { ...defaultTextStyle, ...textStyle };
  const finalIconStyle = { ...defaultIconStyle, ...iconStyle };

  const styles = {
    container: {
      display: "flex",
      alignItems: "center",
      flexDirection: "row",
      gap: "0.5rem",
    },
  };

  return (
    <div style={styles.container}>
      <SVGController
        name={finalIconStyle.name}
        width={finalIconStyle.width}
        height={finalIconStyle.iconHeight}
        stroke={finalIconStyle.stroke}
        fill={finalIconStyle.fill}
      />
      <div style={finalTextStyle}>{text}</div>
    </div>
  );
};

IconTextLabel.propTypes = {
  text: PropTypes.string.isRequired,
  textStyle: PropTypes.object,
  iconStyle: PropTypes.object,
};

export default IconTextLabel;
