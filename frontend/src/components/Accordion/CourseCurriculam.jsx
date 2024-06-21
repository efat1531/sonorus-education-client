import style from "./CourseCurriculam.module.css";
import IconTextLabel from "../uitls/Label/IconTextLabel";
import CourseCurriculamCard from "../uitls/Cards/CourseCurriculamCard";
import PropTypes from "prop-types";
import Divider from "../uitls/Divider";
import React from "react";

const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

const CourseCurriculam = ({ curriculam }) => {
  const totalSections = curriculam.length;
  const totalDuration = curriculam.reduce((acc, curr) => {
    return (
      acc +
      curr.lessons
        .filter((lesson) => lesson.type !== "resource")
        .reduce((total, lesson) => total + (lesson.duration || 0), 0)
    );
  }, 0);
  const totalLesson = curriculam.reduce((acc, curr) => {
    return (
      acc + curr.lessons.filter((lesson) => lesson.type !== "resource").length
    );
  }, 0);

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <div className={style.title}>Curriculam</div>
        <div className={style.funFact}>
          <IconTextLabel
            iconStyle={{ name: "FolderIcon", stroke: "#FF6636" }}
            text={`${totalSections} Sections`}
          />
          <IconTextLabel
            iconStyle={{ name: "PlayCircleIcon", stroke: "#564FFD" }}
            text={`${totalLesson} Lessons`}
          />
          <IconTextLabel
            iconStyle={{ name: "Clock", stroke: "#FD8E1F" }}
            text={convertDuration(totalDuration)}
          />
        </div>
      </div>
      <div className={style.curriculamContainer}>
        {curriculam.map((section, index) => (
          <div key={index}>
            <CourseCurriculamCard courseSection={section} key={index} />
            <Divider width="100%" />
          </div>
        ))}
      </div>
    </div>
  );
};

CourseCurriculam.propTypes = {
  curriculam: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CourseCurriculam;
