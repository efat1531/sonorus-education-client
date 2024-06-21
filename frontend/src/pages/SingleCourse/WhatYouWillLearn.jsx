import style from "./WhatYouWillLearn.module.css";
import WhatYouWillLearnLabel from "../../components/uitls/Label/WhatYouWillLearnLabel";
import React from "react";
import PropTypes from "prop-types";

const WhatYouWillLearn = ({ learning }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>What you will learn</div>
      <div className={style.points}>
        {learning.map((point, index) => (
          <WhatYouWillLearnLabel key={index} textpoint={point} />
        ))}
      </div>
    </div>
  );
};

WhatYouWillLearn.propTypes = {
  learning: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default WhatYouWillLearn;
