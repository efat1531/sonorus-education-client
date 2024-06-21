import React from "react";
import HomePage from "./pages/Homepage/HomePage";
import CourseList from "./pages/CourseList/CourseList";
import SingleCourseMainPage from "./pages/SingleCourse/MainPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import "../src/index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/courses/:id" element={<SingleCourseMainPage />} />

        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
