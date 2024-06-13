import PropTypes from "prop-types";
import style from "./HomePageCourseTemplate.module.css";
import CourseSmall from "../../uitls/Cards/CourseSmall";

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
  courses: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

export default HomePageTemplate;
