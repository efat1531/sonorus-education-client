import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import HeroImage1 from "./HeroImage1";
import HeroImage2 from "./HeroImage2";
import HeroSection from "./HeroSection";
import TopInstructor from "./TopInstructor";
import HomePageCourseTemplate from "../../components/uitls/Template/HomePageCourseTemplate";
import Footer from "../../components/Footer/Footer";
import React from "react";
import courseData from "../../../Data/courseData.json";

const HomePage = () => {
  const topCourses = courseData.slice(0, 3);
  const newCourses = courseData.slice(0, 3);

  return (
    <div>
      <NavBarDesktop />
      <HeroSection />
      <HeroImage1 />
      <HeroImage2 />
      <HomePageCourseTemplate title={`Top Courses`} courses={topCourses} />
      <HomePageCourseTemplate title={`Recent Courses`} courses={newCourses} />
      <TopInstructor />
      <Footer />
    </div>
  );
};

export default HomePage;
