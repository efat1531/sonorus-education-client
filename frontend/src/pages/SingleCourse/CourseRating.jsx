import style from "./CourseRating.module.css";
import StarRatingCard from "../../components/uitls/Cards/StarRatingCard";
import RatingProgressBar from "../../components/uitls/Label/RatingProgressBar";
import React from "react";

const CourseRating = () => {
  const rating = 4.8;

  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>Course Rating</div>
      <div className={style.ratingContainer}>
        <div className={style.ratingBox}>
          <div className={style.ratingText}>{rating}</div>
          <div className={style.ratingInfo}>
            <StarRatingCard rating={rating} size="lg" />
            <div className={style.textCourse}>Course Rating</div>
          </div>
        </div>
        <div className={style.ratingSummary}>
          {[5, 4, 3, 2, 1].map((rating, index) => (
            <RatingProgressBar key={index} value={rating} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CourseRating;
