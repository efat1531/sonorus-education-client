import style from "./CourseRequirement.module.css";
import RequirementList from "../../components/uitls/ListGenerator/RequirementList";
import React from "react";

const CourseRequirements = [
  {
    text: "A computer with internet connection",
    need: true,
  },

  {
    text: "Basic knowledge of HTML, CSS, and JavaScript",
    need: true,
  },

  {
    text: "Basic knowledge of React",
    need: false,
  },

  {
    text: "Basic knowledge of Node.js",
    need: false,
  },

  {
    text: "Basic knowledge of MongoDB",
    need: false,
  },
];

const CourseRequirement = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>Course Requirement</div>
      <div className={style.reqirementList}>
        {CourseRequirements.map((requirement, index) => (
          <RequirementList key={index} requirement={requirement} />
        ))}
      </div>
    </div>
  );
};

export default CourseRequirement;
