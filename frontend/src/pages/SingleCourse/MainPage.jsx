import style from "./MainPage.module.css";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import SingleCourse from "./SingleCourse";
import SideBar from "./SideBar";
import React from "react";

const SingleCourseMainPage = () => {
  return (
    <div>
      <NavBarDesktop />
      {/* Display flex coumn */}
      <div className={style.mainContainer}>
        {/* Main Course */}
        <div className={style.courseDetails}>
          <SingleCourse />
        </div>
        {/* Side Bar */}
        <div>
          <SideBar />
        </div>
      </div>
    </div>
  );
};

export default SingleCourseMainPage;
