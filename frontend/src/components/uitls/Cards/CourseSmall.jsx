import style from "./CourseSmall.module.css";

import PropTypes from "prop-types";

const CourseSmall = ({ course }) => {
  const { imageSrc, category, price, title, rating, students } = course;
  const numOfStudents =
    students > 1000 ? `${(students / 1000).toFixed(1)}k` : students;
  const studentLabel = students < 2 ? `student` : `students`;
  const discount = 10;
  const discountPercentage = discount ? (discount / price) * 100 : 0;
  return (
    <main className={style.container}>
      <img loading="lazy" src={imageSrc} className={style.mainImage} alt="" />
      <section className={style.contentSection}>
        <header className={style.header}>
          <span className={style.tag}>{category}</span>
          <div>
            {discount && (
              <span className={style.Discountprice}>
                {price - discount}$&nbsp;
              </span>
            )}
            <span
              className={style.price}
              style={
                discount
                  ? {
                      textDecoration: "line-through",
                      color: "GrayText",
                      opacity: "0.5",
                      fontSize: "0.8rem",
                    }
                  : {}
              }
            >
              {price}$
            </span>
          </div>
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
