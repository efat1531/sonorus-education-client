import style from "./RequirementList.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckDouble, faCheck } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import PropTypes from "prop-types";

const RequirementList = ({ requirement }) => {
  return (
    <div className={style.mainContainer}>
      {requirement.need && (
        <FontAwesomeIcon icon={faCheckDouble} style={{ color: "#28A745" }} />
      )}
      {!requirement.need && (
        <FontAwesomeIcon icon={faCheck} style={{ color: "#808080" }} />
      )}
      <div className={style.text}>{requirement.text}</div>
    </div>
  );
};

RequirementList.propTypes = {
  requirement: PropTypes.shape({
    text: PropTypes.string.isRequired,
    need: PropTypes.bool.isRequired,
  }),
};

export default RequirementList;
