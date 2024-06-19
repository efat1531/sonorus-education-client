import PropTypes from "prop-types";
import style from "./HomePageCourseTemplate.module.css";
import CourseSmall from "../Cards/CourseSmall";
import React from "react";

const HomePageTemplate = ({ title, courses }) => {
  return (
    <div>
      <section className={style.mainContainer}>
        <header className={style.mainHeader}>
          <h1 className={style.title}>{title}</h1>
          <main className={style.courseList}>
            {courses.map((course, index) => (
              <CourseSmall key={index} course={course} />
            ))}
          </main>
        </header>
      </section>
    </div>
  );
};

HomePageTemplate.propTypes = {
  courses: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default HomePageTemplate;
