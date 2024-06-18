import style from "./RatingProgressBar.module.css";
import StarRatingCard from "../Cards/StarRatingCard";
import PropTypes from "prop-types";

const ratingQuantity = {
  5: 0,
  4: 0,
  3: 0,
  2: 0,
  1: 0,
};

const calculateParcentage = (value) => {
  const total = Object.values(ratingQuantity).reduce(
    (acc, cur) => acc + cur,
    0
  );

  return (ratingQuantity[value] / total) * 100 || 0.001;
};

const calculateProgressWidth = (value) => {
  const maxWidth = 23.5;
  const width = calculateParcentage(value);
  return (width / 100) * maxWidth;
};

const RatingProgressBar = ({ value }) => {
  return (
    <div className={style.ratingProgress}>
      <div className={style.starRating}>
        <StarRatingCard rating={value} size="1x" />
        <div className={style.textStarRating}>{value}&nbsp;Star Rating</div>
      </div>
      <div className={style.progressContainer}>
        <div className={style.progressBar}></div>
        <div
          className={style.progressBarMain}
          style={{ width: `${calculateProgressWidth(value)}rem` }}
        ></div>
        <div className={style.progressValue}>
          {calculateParcentage(value) >= 1
            ? `${calculateParcentage(value).toFixed(0)}%`
            : "< 1%"}
        </div>
      </div>
    </div>
  );
};

export default RatingProgressBar;
