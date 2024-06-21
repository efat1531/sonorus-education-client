import style from "./FeatureCard.module.css";
import FeatureLabel from "../Label/FeatureLabel";
import React from "react";
import PropTypes from "prop-types";

const FeatureCard = ({
  duration,
  level,
  totalStudents,
  language = "English",
}) => {
  return (
    <div className={style.mainContainer}>
      <FeatureLabel
        SVG="Clock"
        FirstText="Course Duration"
        SecondText={convertTimeToMonths(duration)}
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG="BarChart"
        FirstText="Course Level"
        SecondText={level}
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG={"Students"}
        FirstText="Students Enrolled"
        SecondText={studentsCount(totalStudents)}
        StrokeColor="#A1A5B3"
      />
      <FeatureLabel
        SVG={"NoteBook"}
        FirstText="Language"
        SecondText={language}
        StrokeColor="#A1A5B3"
      />
    </div>
  );
};

FeatureCard.propTypes = {
  duration: PropTypes.number.isRequired,
  level: PropTypes.string.isRequired,
  totalStudents: PropTypes.number.isRequired,
  language: PropTypes.string,
};

const studentsCount = (students) => {
  return students.toLocaleString("en-IN");
};

const convertTimeToMonths = (time) => {
  return (time / 30).toFixed(1) + " Months";
};

export default FeatureCard;
