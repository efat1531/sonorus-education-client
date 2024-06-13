import style from "./CourseSmall.module.css";

import PropTypes from "prop-types";

const CourseSmall = ({ course }) => {
  const { imageSrc, category, price, title, rating, students } = course;
  const numOfStudents =
    students > 1000 ? `${(students / 1000).toFixed(1)}k` : students;
  const studentLabel = students < 2 ? `student` : `students`;
  return (
    <main className={style.container}>
      <img loading="lazy" src={imageSrc} className={style.mainImage} alt="" />
      <section className={style.contentSection}>
        <header className={style.header}>
          <span className={style.tag}>{category}</span>
          <span className={style.price}>{price}$</span>
        </header>
        <p className={style.description}>{title}</p>
      </section>
      <hr className={style.divider} />
      <footer className={style.footer}>
        <div className={style.rating}>
          ⭐<span>{rating}</span>
        </div>
        <div className={style.studentsInfo}>
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
