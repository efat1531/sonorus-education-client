import React from "react";
import style from "./InfoBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const InfoBar = ({ courseInfo }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.leftInfo}>
        <div className={style.backBtn}>
          <FontAwesomeIcon
            icon={faArrowLeft}
            size="xl"
            style={{ color: "#1D2026" }}
          />
        </div>
        <div className={style.heading}></div>
      </div>
    </div>
  );
};

InfoBar.propTypes = {
  courseInfo: PropTypes.object,
};

export default InfoBar;
