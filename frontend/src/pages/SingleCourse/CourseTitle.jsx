import style from "./CourseTitle.module.css";
import StarRatingCard from "../../components/uitls/Cards/StarRatingCard";
import React from "react";
import PropTypes from "prop-types";
import userData from "../../../Data/userData.json";

const CourseTitle = ({ course }) => {
  const instructorInfo = userData.find(
    (user) => user.userID === course.instructor
  );

  return (
    <div className={style.sectionContainer}>
      <div className={style.courseLink}>
        <div
          onClick={() => {
            window.location.href = "/";
          }}
        >
          Home
        </div>{" "}
        <div>{">"}</div> <div>{course.category.name}</div>
      </div>
      {/* Title */}
      <div className={style.courseTitle}>{course.title}</div>
      {/* Summary */}
      <div className={style.courseSummary}>{course.summary}</div>
      {/* Teacher and Rating*/}
      <div className={style.teacherRating}>
        {/* Teacher Info */}
        <div className={style.teacherInfo}>
          {/* Profile Img */}
          <div className={style.teacherImg}>
            <img src={instructorInfo.profileImg} alt="Teacher" />
          </div>
          {/* Teacher Name */}
          <div className={style.teacherName}>
            <div className={style.createdBy}>Created By</div>
            <div className={style.orginalName}>{instructorInfo.name}</div>
          </div>
        </div>
        {/* Rating */}
        <div className={style.ratingInfo}>
          {/* star */}
          <StarRatingCard rating={course.rating} />
          {/* Rating */}
          <div className={style.ratingShow}>{course.rating}</div>
          {/* Number of Ratings */}
          <div className={style.numOfRatings}>
            ({course.numOfRating}&nbsp;students)
          </div>
        </div>
      </div>
    </div>
  );
};

CourseTitle.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseTitle;
