import style from "./CourseTitle.module.css";
import StarRatingCard from "../../components/uitls/Cards/StarRatingCard";
import React from "react";

const imageURL = "https://picsum.photos/200/200.jpg";
const cateGory = "Development";

const CourseTitle = () => {
  return (
    <div className={style.sectionContainer}>
      <div className={style.courseLink}>
        <div>Home</div> <div>{">"}</div> <div>{cateGory}</div>
      </div>
      {/* Title */}
      <div className={style.courseTitle}>
        Complete Website Responsive Design: from Figma to Webflow to Website
        Design
      </div>
      {/* Summary */}
      <div className={style.courseSummary}>
        3 in 1 Course: Learn to design websites with Figma, build with Webflow,
        and make a living freelancing.
      </div>
      {/* Teacher and Rating*/}
      <div className={style.teacherRating}>
        {/* Teacher Info */}
        <div className={style.teacherInfo}>
          {/* Profile Img */}
          <div className={style.teacherImg}>
            <img src={imageURL} alt="Teacher" />
          </div>
          {/* Teacher Name */}
          <div className={style.teacherName}>
            <div className={style.createdBy}>Created By</div>
            <div className={style.orginalName}>John Doe</div>
          </div>
        </div>
        {/* Rating */}
        <div className={style.ratingInfo}>
          {/* star */}
          <StarRatingCard rating={3.6} />
          {/* Rating */}
          <div className={style.ratingShow}>3.6</div>
          {/* Number of Ratings */}
          <div className={style.numOfRatings}>(200 Ratings)</div>
        </div>
      </div>
    </div>
  );
};

export default CourseTitle;
