import style from "./WhatYouWillLearnLabel.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const WhatYouWillLearnLabel = ({ textpoint }) => {
  return (
    <div className={style.mainContainer}>
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={{ color: "#23BD33" }}
        size={"xl"}
      />
      <div className={style.text}>{textpoint}</div>
    </div>
  );
};

WhatYouWillLearnLabel.propTypes = {
  textpoint: PropTypes.string.isRequired,
};

export default WhatYouWillLearnLabel;
