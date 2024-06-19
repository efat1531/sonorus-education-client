import React from "react";
import style from "./RelatedCourse.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import CourseSmall from "../../components/uitls/Cards/CourseSmall";

const RelatedCourse = ({ courseList }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <div className={style.title}>Related Courses</div>
        <div className={style.viewAllBtn}>
          <div className={style.btnText}>View All</div>
          <FontAwesomeIcon
            icon={faUpRightFromSquare}
            size="lg"
            style={{ color: "#FF6636" }}
          />
        </div>
      </div>
      <div className={style.courseContainer}>
        {courseList.map((course, index) => (
          <CourseSmall key={index} course={course} />
        ))}
      </div>
    </div>
  );
};

RelatedCourse.propTypes = {
  courseList: PropTypes.array,
};

export default RelatedCourse;
