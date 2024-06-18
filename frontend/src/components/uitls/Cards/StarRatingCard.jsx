import style from "./StarRatingCard.module.css";
import PropTypes from "prop-types";
import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfStroke } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarRegular } from "@fortawesome/free-regular-svg-icons";

const starRating = (rating, size, color) => {
  const stars = [];
  const floorRating = Math.floor(rating);
  const hasHalfStar = rating - floorRating >= 0.5;

  for (let i = 0; i < floorRating; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStar}
        size={size}
        style={{ color: `${color}` }}
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarHalfStroke}
        size={size}
        style={{ color: `${color}` }}
      />
    );
  }

  for (let i = stars.length; i < 5; i++) {
    stars.push(
      <FontAwesomeIcon
        icon={faStarRegular}
        size={size}
        style={{ color: `${color}` }}
      />
    );
  }

  return stars;
};

const StarRatingCard = ({
  rating,
  size = "xl",
  gap = "0rem",
  color = "#FD8E1F",
}) => {
  const stars = starRating(rating, size, color).map((star, index) =>
    React.cloneElement(star, { key: index })
  );
  return (
    <div className={style.starContainer} style={{ gap: `${gap}` }}>
      {stars}
    </div>
  );
};

StarRatingCard.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.string,
  gap: PropTypes.string,
  color: PropTypes.string,
};

export default StarRatingCard;
