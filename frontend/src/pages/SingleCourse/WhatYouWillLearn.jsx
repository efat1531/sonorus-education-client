import style from "./WhatYouWillLearn.module.css";
import WhatYouWillLearnLabel from "../../components/uitls/Label/WhatYouWillLearnLabel";
import React from "react";

const whatYouWillLearn = [
  "You will learn how to design beautiful websites using Figma, an interface design tool used by designers at Uber, Airbnb and Microsoft.",
  "How to build a complete website in Webflow",
  "How to write winning proposals",
  "How to create a stunning portfolio website",
  "How to get your first clients",
  "How to make $5,000+ a month",
  "How to become a sought-after professional",
];

const WhatYouWillLearn = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>What you will learn</div>
      <div className={style.points}>
        {whatYouWillLearn.map((point, index) => (
          <WhatYouWillLearnLabel key={index} textpoint={point} />
        ))}
      </div>
    </div>
  );
};

export default WhatYouWillLearn;
