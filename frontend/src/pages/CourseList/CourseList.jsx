import style from "./CourseList.module.css";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import MainCourses from "./MainCourses";
import Footer from "../../components/Footer/Footer";

const CourseList = () => {
  return (
    <>
      <NavBarDesktop />
      <MainCourses />
      <Footer />
    </>
  );
};

export default CourseList;
