import style from "./MainPage.module.css";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import SingleCourse from "./SingleCourse";
import SideBar from "./SideBar";
import RelatedCourse from "./RelatedCourse";
import Footer from "../../components/Footer/Footer";
import React from "react";
import courses from "../../../Data/courseData.json";
import { useParams } from "react-router-dom";

const SingleCourseMainPage = () => {
  const { id } = useParams();
  const course = courses.find((course) => course.id === id);

  return (
    <div>
      <NavBarDesktop />
      {/* Display flex coumn */}
      <div className={style.mainContainer}>
        {/* Main Course */}
        <div className={style.courseDetails}>
          <SingleCourse course={course} />
        </div>
        {/* Side Bar */}
        <div>
          <SideBar course={course} />
        </div>
      </div>
      <RelatedCourse courseList={courses.slice(0, 5)} />
      <Footer />
    </div>
  );
};

export default SingleCourseMainPage;
