import style from "./CourseCurriculamCard.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import IconTextLabel from "../Label/IconTextLabel";
import CourseCurriculamList from "../ListGenerator/CourseCurriculamList";
import React from "react";

const totalDuration = (courseSection) => {
  return courseSection.lessons
    .filter((lesson) => lesson.type !== "resource")
    .reduce((total, lesson) => total + lesson.duration, 0);
};

const formatDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

const totalLectures = (courseSection) => {
  return courseSection.lessons.filter((lesson) => lesson.type !== "resource")
    .length;
};

const CourseCurriculamCard = ({ courseSection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };
  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.mainContainer}>
      <div
        className={style.titleContainer}
        onMouseEnter={toggleHover}
        onMouseLeave={toggleHover}
        onClick={toggleOpen}
      >
        <div className={style.info}>
          <FontAwesomeIcon
            icon={faChevronDown}
            style={{
              color: hover ? "#FF6B00" : "#6E7485",
              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            }}
            size="lg"
          />
          <div
            className={style.title}
            style={{ color: hover ? "#FF6B00" : "#1D2026" }}
          >
            {courseSection.title}
          </div>
        </div>
        <div className={style.funFact}>
          <IconTextLabel
            iconStyle={{ name: "PlayCircleIcon", stroke: "#564FFD" }}
            text={`${totalLectures(courseSection)} Lessons`}
          />
          <IconTextLabel
            iconStyle={{ name: "Clock", stroke: "#FD8E1F" }}
            text={formatDuration(totalDuration(courseSection))}
          />
        </div>
      </div>

      {isOpen && (
        <div className={style.curriculamContainer}>
          {courseSection.lessons.map((lesson) => (
            <CourseCurriculamList lesson={lesson} key={lesson.id} />
          ))}
        </div>
      )}
    </div>
  );
};

CourseCurriculamCard.propTypes = {
  courseSection: PropTypes.object.isRequired,
};

export default CourseCurriculamCard;
