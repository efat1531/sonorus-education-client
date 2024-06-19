import style from "./RatingInput.module.css";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import SVGController from "../../../assets/svg/SVGController";
import React from "react";

const handleClick = (rating, dispatch) => {
  dispatch({ type: "rating", payload: rating });
};

const RatingInput = ({ rating, dispatch }) => {
  const [hoverRating, setHoverRating] = useState(0);
  useEffect(() => {
    setHoverRating(0);
  }, [rating]);
  return (
    <div className={style.mainContainer}>
      {[...Array(5)].map((star, index) => {
        return (
          <div
            key={index}
            onMouseEnter={() => setHoverRating(index + 1)}
            onMouseLeave={() => setHoverRating(rating)}
            onClick={() => handleClick(index + 1, dispatch)}
          >
            <SVGController
              name="Star"
              width="3rem"
              height="3rem"
              fill={index < (hoverRating || rating) ? "#FD8E1F" : "none"}
              stroke={index < (hoverRating || rating) ? "#FD8E1F" : "#CED1D9"}
            />
          </div>
        );
      })}
    </div>
  );
};

RatingInput.propTypes = {
  rating: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default RatingInput;
