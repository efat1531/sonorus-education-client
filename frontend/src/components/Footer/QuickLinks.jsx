import style from "./QuickLinks.module.css";
import Proptypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { React, useState } from "react";
const QuickLinks = ({ label }) => {
  const [isHover, setIsHover] = useState(false);
  const handleHoverOn = () => {
    setIsHover(true);
  };
  const handleHoverOff = () => {
    setIsHover(false);
  };
  return (
    <div
      className={style.quickLink}
      onMouseEnter={handleHoverOn}
      onMouseLeave={handleHoverOff}
    >
      <div
        className={style.iconText}
        style={{
          boxShadow: isHover ? " 0px -1.5px 0px 0px #ff6636 inset" : "none",
        }}
      >
        <div
          className={style.labelText}
          style={{
            color: isHover ? "#fff" : "#8c94a3",
            fontWeight: isHover ? 600 : 400,
            letterSpacing: isHover ? "0.02rem" : "-0.00875rem",
          }}
        >
          {label}
        </div>
        {isHover && (
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            style={{ color: "#ff6636" }}
            size="xs"
          />
        )}
      </div>
    </div>
  );
};

QuickLinks.propTypes = {
  label: Proptypes.string.isRequired,
};

export default QuickLinks;
