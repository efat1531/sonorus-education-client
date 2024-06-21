import style from "./TeacherInfo.module.css";
import TeacherInfoCard from "../../components/uitls/Cards/TeacherInfoCard";
import PropTypes from "prop-types";
import React from "react";

const TeacherInfo = ({ instructorInfo }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>Course Instructor</div>
      <TeacherInfoCard instructorInfo={instructorInfo} />
    </div>
  );
};

TeacherInfo.propTypes = {
  instructorInfo: PropTypes.object.isRequired,
};

export default TeacherInfo;
