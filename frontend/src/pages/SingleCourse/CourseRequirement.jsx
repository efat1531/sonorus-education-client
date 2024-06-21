import style from "./CourseRequirement.module.css";
import RequirementList from "../../components/uitls/ListGenerator/RequirementList";
import React from "react";
import PropTypes from "prop-types";

const CourseRequirement = ({ courseRequirements }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>Course Requirement</div>
      <div className={style.reqirementList}>
        {courseRequirements.map((requirement, index) => (
          <RequirementList key={index} requirement={requirement} />
        ))}
      </div>
    </div>
  );
};

CourseRequirement.propTypes = {
  courseRequirements: PropTypes.arrayOf(
    PropTypes.shape({ text: PropTypes.string, need: PropTypes.bool })
  ).isRequired,
};

export default CourseRequirement;
