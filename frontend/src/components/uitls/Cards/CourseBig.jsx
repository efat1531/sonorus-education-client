import style from "./CourseBig.module.css";
import PropTypes from "prop-types";
import PeopleSVG from "../../../assets/svg/People.svg";
import React from "react";

const studentCount = (students) => {
  return students > 1000 ? `${(students / 1000).toFixed(1)}k` : students;
};

const CourseBig = ({ course }) => {
  return (
    <div className={style.courseCard}>
      <div className={style.courseImage}>
        <img
          src={course.image}
          alt={course.title}
          width="424px"
          height="312px"
        />
      </div>
      <div className={style.courseInfo}>
        <div className={style.priceCategory}>
          <div
            className={style.category}
            style={{
              backgroundColor: `${course.category.backgroundColor}`,
              color: `${course.category.color}`,
            }}
          >
            <span>{course.category.name}</span>
          </div>
          <div className={style.discount}>
            {course.discount > 0 && (
              <span className={style.price}>
                {course.price - course.discount}$&nbsp;
              </span>
            )}
            <div
              className={style.price}
              style={
                course.discount > 0
                  ? {
                      textDecoration: "line-through",
                      color: "GrayText",
                      opacity: "0.5",
                      fontSize: "0.9rem",
                    }
                  : {}
              }
            >
              {course.price}$
            </div>
          </div>
        </div>
        <div className={style.title}>{course.title}</div>
      </div>
      <div className={style.divider}></div>
      <div className={style.courseFooter}>
        <div className={style.rating}>
          ⭐<span>&nbsp;{course.rating}</span>
        </div>
        <div className={style.students}>
          <PeopleSVG />
          <span>{studentCount(course.students)}</span>
          <span> students</span>
        </div>
      </div>
    </div>
  );
};

CourseBig.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseBig;
