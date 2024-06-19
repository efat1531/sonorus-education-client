import style from "./CourseSmall.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import SVGController from "../../../assets/svg/SVGController";

import PropTypes from "prop-types";

const CourseSmall = ({ course }) => {
  const { imageSrc, category, price, title, rating, students, discount } =
    course;
  const numOfStudents =
    students > 1000 ? `${(students / 1000).toFixed(1)}k` : students;
  const studentLabel = students < 2 ? `student` : `students`;
  return (
    <main className={style.container}>
      <img loading="lazy" src={imageSrc} className={style.mainImage} alt="" />
      <section className={style.contentSection}>
        <header className={style.header}>
          <span
            className={style.tag}
            style={{
              backgroundColor: `${category.backgroundColor}`,
              color: `${category.color}`,
            }}
          >
            {category.name}
          </span>
          <div>
            {discount > 0 && (
              <span className={style.Discountprice}>
                {price - discount}$&nbsp;
              </span>
            )}
            <span
              className={style.price}
              style={
                discount > 0
                  ? {
                      textDecoration: "line-through",
                      color: "GrayText",
                      opacity: "0.5",
                      fontSize: "0.8rem",
                    }
                  : {}
              }
            >
              {price == 0 ? "Free" : price}
              {price > 0 ? "$" : ""}
            </span>
          </div>
        </header>
        <p className={style.description}>{title}</p>
      </section>
      <hr className={style.divider} />
      <footer className={style.footer}>
        <div className={style.rating}>
          <FontAwesomeIcon
            icon={faStar}
            size="1x"
            style={{ color: "#FD8E1F" }}
          />
          <span>{rating}</span>
        </div>
        <div className={style.studentsInfo}>
          <SVGController
            name={"PeopleIcon"}
            width="1.25rem"
            height="1.25rem"
            stroke="#564FFD"
          />
          <span className={style.studentsCount}>{numOfStudents}</span>
          <span className={style.studentsLabel}>{studentLabel}</span>
        </div>
      </footer>
    </main>
  );
};

CourseSmall.propTypes = {
  course: PropTypes.object.isRequired,
};

export default CourseSmall;
