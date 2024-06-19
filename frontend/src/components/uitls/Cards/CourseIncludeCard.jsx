import style from "./CourseIncludeCard.module.css";
import FeatureIncludeLabel from "../Label/FeatureIncludeLabel";
import React from "react";

const CourseIncludesCard = () => {
  return (
    <div className={style.mainContainer}>
      <FeatureIncludeLabel
        svgName="Clock"
        messgae="Lifetime access to the course"
      />
      <FeatureIncludeLabel
        svgName="NoteBook"
        messgae="Free exercises file & downloadable resources"
      />
      <FeatureIncludeLabel
        svgName="Monitor"
        messgae="Access on Laptop and TV"
      />
      <FeatureIncludeLabel svgName="NotePad" messgae="English subtitles" />
      <FeatureIncludeLabel svgName="Stack" messgae="100% online course" />
    </div>
  );
};

export default CourseIncludesCard;
