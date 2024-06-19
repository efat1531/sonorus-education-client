import style from "./WriteReview.module.css";
import React from "react";
import { useState, useReducer } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faXmark,
  faPaperPlane,
} from "@fortawesome/free-solid-svg-icons";
import RatingInput from "../../components/uitls/Input/RatingInput";

const initials = {
  rating: 0,
  feedback: "",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "rating":
      return { ...state, rating: action.payload };
    case "feedback":
      return { ...state, feedback: action.payload };
    case "reset":
      return { ...initials };
    default:
      throw new Error("Invalid action type");
  }
};

const handleSubmitBtn = (state, dispatch) => {
  dispatch({ type: "reset" });
};

const ratingOutput = (rating) => {
  if (rating > 4) return "Excellent";
  else if (rating >= 3) return "Good";
  else if (rating >= 2) return "Average";
  else if (rating >= 1) return "Poor";
  else return "Add a rating";
};

const WriteReview = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [state, dispatch] = useReducer(reducer, initials);
  const [ratingBtnHover, setRatingBtnHover] = useState(false);

  const handleRatingBtnHover = () => {
    setRatingBtnHover(true);
  };

  const handleRatingBtnLeave = () => {
    setRatingBtnHover(false);
  };

  return (
    <div className={style.mainContainer}>
      <div
        className={style.heading}
        onMouseEnter={handleRatingBtnHover}
        onMouseLeave={handleRatingBtnLeave}
        onClick={() => setIsOpen(!isOpen)}
        style={{ cursor: "pointer" }}
      >
        <div>Write a Review</div>
        <div>
          {!isOpen && (
            <FontAwesomeIcon
              icon={faChevronDown}
              style={{
                color: ratingBtnHover ? "#FD8E1F" : "#8C94A3",
              }}
              size="lg"
            />
          )}
          {isOpen && (
            <FontAwesomeIcon
              icon={faXmark}
              style={{ color: ratingBtnHover ? "#FD8E1F" : "#8C94A3" }}
              size="lg"
            />
          )}
        </div>
      </div>
      {isOpen && (
        <div className={style.ratingInput}>
          <div className={style.ratingHeading}>
            <div className={style.ratingText}>{state.rating}</div>
            <div className={style.ratingOutput}>
              &nbsp;{ratingOutput(state.rating)}
            </div>
          </div>
          <RatingInput rating={state.rating} dispatch={dispatch} />
        </div>
      )}
      {isOpen && (
        <div className={style.reviewInput}>
          <div className={style.feedback}>Feedback</div>
          <div className={style.inputContainer}>
            <textarea
              className={style.feedbackInput}
              placeholder="Write your review here..."
              maxLength={700}
              value={state.feedback}
              onChange={(e) =>
                dispatch({ type: "feedback", payload: e.target.value })
              }
            />
          </div>
        </div>
      )}
      {isOpen && (
        <div className={style.btnContainer}>
          <button className={style.cancelBtn}>Cancel</button>
          <button className={style.submitBtn}>
            <div
              className={style.submitText}
              onClick={() => handleSubmitBtn(state, dispatch)}
            >
              Submit
            </div>
            <FontAwesomeIcon
              icon={faPaperPlane}
              style={{ color: "#fff" }}
              size="1x"
            />
          </button>
        </div>
      )}
    </div>
  );
};

export default WriteReview;
