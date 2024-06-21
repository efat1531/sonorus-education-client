import style from "./CourseDescription.module.css";
import TextWithParagraphs from "../../components/uitls/Format/TextWithParagraph";
import React from "react";
import PropTypes from "prop-types";

const CourseDesciption = ({ description }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.title}>Description</div>
      <div className={style.paragraph}>
        <TextWithParagraphs text={description} />
      </div>
    </div>
  );
};

CourseDesciption.propTypes = {
  description: PropTypes.string.isRequired,
};

export default CourseDesciption;
