/* eslint-disable no-unused-vars */
import React from "react";
import HomePage from "./pages/Homepage/HomePage";
import CourseList from "./pages/CourseList/CourseList";
import SingleCourseMainPage from "./pages/SingleCourse/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "../src/index.css";

const App = () => {
  return (
    <div>
      {/* <SingleCourseMainPage /> */}
      {/* <CourseList /> */}
      {/* <HomePage /> */}
      <ErrorPage />
    </div>
  );
};

export default App;
