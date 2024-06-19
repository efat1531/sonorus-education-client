import style from "./StudentFeedbackCard.module.css";
import PropTypes from "prop-types";
import { formatDistanceToNow } from "date-fns";
import StarRatingCard from "./StarRatingCard";
import React from "react";

const formatDate = (date) => {
  return formatDistanceToNow(new Date(date)) + " ago";
};

const StudentFeedbackCard = ({ feedback }) => {
  const { imageURL, name, date, feedback: feedbackText, rating } = feedback;
  return (
    <div className={style.mainContainer}>
      <div
        className={style.imageContainer}
        style={{
          background: `url(${imageURL}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
      <div className={style.feedbackContainer}>
        <div className={style.feedbackRating}>
          <div className={style.nameBox}>
            <div className={style.name}>{name}</div>
            <div className={style.dot}>•</div>
            <div className={style.date}>{formatDate(date)}</div>
          </div>
          <StarRatingCard rating={rating} size="1x" gap="0rem" />
        </div>
        <div className={style.feedbackText}>{feedbackText}</div>
      </div>
    </div>
  );
};

StudentFeedbackCard.propTypes = {
  feedback: PropTypes.object.isRequired,
};

export default StudentFeedbackCard;
