import style from "./CourseCurriculamList.module.css";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { faFile } from "@fortawesome/free-regular-svg-icons";
import { useState } from "react";
import React from "react";

const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
};

const CourseCurriculamList = ({ lesson }) => {
  const [hover, setHover] = useState(false);
  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <div
      className={style.mainContainer}
      onMouseEnter={toggleHover}
      onMouseLeave={toggleHover}
    >
      <div className={style.info}>
        {lesson.type === "video" && (
          <FontAwesomeIcon
            icon={faPlay}
            size="1x"
            style={{ color: hover ? "#FF6B00" : "#1D2026" }}
          />
        )}
        {lesson.type === "resource" && (
          <FontAwesomeIcon
            icon={faFile}
            size="1x"
            style={{ color: hover ? "#FF6B00" : "#1D2026" }}
          />
        )}
        <div
          className={style.subTitle}
          style={{ color: hover ? "#FF6B00" : "#4e5566" }}
        >
          {lesson.title}
        </div>
      </div>
      {lesson.type === "video" && (
        <div className={style.duration}>{convertDuration(lesson.duration)}</div>
      )}
    </div>
  );
};

CourseCurriculamList.propTypes = {
  lesson: PropTypes.shape({
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }),
};

export default CourseCurriculamList;
