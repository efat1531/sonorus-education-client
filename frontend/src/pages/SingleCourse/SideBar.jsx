import style from "./SideBar.module.css";
import PriceCard from "../../components/uitls/Cards/PriceCard";
import Divider from "../../components/uitls/Divider";
import FeatureCard from "../../components/uitls/Cards/FeatureCard";
import ButtonTemplate from "../../components/uitls/Buttons/ButtonTemplate";
import CourseIncludeCard from "../../components/uitls/Cards/CourseIncludeCard";
import ShareSocial from "../../components/uitls/Label/ShareSocial";
import PropTypes from "prop-types";
import React from "react";

const SideBar = ({ course }) => {
  const {
    price,
    discount,
    discountEnds,
    duration,
    courseLevel,
    courseLanguage,
    students,
  } = course;
  console.log(
    typeof duration,
    typeof courseLevel,
    typeof courseLanguage,
    typeof students
  );
  return (
    <div className={style.mainContainer}>
      <PriceCard price={price} discount={discount} endTime={discountEnds} />
      <Divider width="26.5rem" />
      <FeatureCard
        duration={duration}
        level={courseLevel}
        totalStudents={students}
        language={courseLanguage}
      />
      <Divider width="26.5rem" />
      <div className={style.buttonContainer}>
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#FF6636"
          btnText="Add to Cart"
          btnTextColor="#fff"
        />
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#FFEEE8"
          btnText="Buy Now"
          btnTextColor="#FF6636"
        />
        <ButtonTemplate
          padding="0 2rem"
          width="23.5rem"
          backgroundColor="#E9EAF0"
          btnText="Add to Wishlist"
          btnTextColor="#4E5566"
        />
      </div>
      <Divider width="26.5rem" />
      <div className={style.cIncludeSection}>
        <div className={style.text}>This course includes:</div>
        <CourseIncludeCard />
      </div>
      <Divider width="26.5rem" />
      <ShareSocial />
    </div>
  );
};

SideBar.propTypes = {
  course: PropTypes.object.isRequired,
};

export default SideBar;
