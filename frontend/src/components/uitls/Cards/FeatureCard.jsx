import style from "./FeatureCard.module.css";
import FeatureLabel from "../Label/FeatureLabel";
import React from "react";

const studentsCount = (students) => {
  return students.toLocaleString("en-IN");
};

const FeatureCard = () => {
  return (
    <div className={style.mainContainer}>
      <FeatureLabel
        SVG="Clock"
        FirstText="Course Duration"
        SecondText="6 Month"
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG="BarChart"
        FirstText="Course Level"
        SecondText="Beginner and Intermediate"
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG={"Students"}
        FirstText="Students Enrolled"
        SecondText={studentsCount(1000)}
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG={"NoteBook"}
        FirstText="Language"
        SecondText="Mandarin"
        StrokeColor="#A1A5B3"
      />
    </div>
  );
};

export default FeatureCard;
