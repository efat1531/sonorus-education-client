import style from "./TeacherInfo.module.css";
import TeacherInfoCard from "../../components/uitls/Cards/TeacherInfoCard";
import React from "react";

const TeacherInfo = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>Course Instructor</div>
      <TeacherInfoCard />
    </div>
  );
};

export default TeacherInfo;
