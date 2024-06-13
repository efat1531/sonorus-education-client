import CourseSmall from "../../components/uitls/Cards/CourseSmall";
import style from "./RecentCourse.module.css";

const RecentCourse = () => {
  return (
    <div className={style.sectionContainer}>
      <h1 className={style.headerText}>Recent Courses</h1>
      <div className={style.courseDiv}>
        <CourseSmall />
        <CourseSmall />
        <CourseSmall />
        <CourseSmall />
      </div>
    </div>
  );
};

export default RecentCourse;
