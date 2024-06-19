import style from "./MainPage.module.css";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import SingleCourse from "./SingleCourse";
import SideBar from "./SideBar";
import RelatedCourse from "./RelatedCourse";
import Footer from "../../components/Footer/Footer";
import React from "react";

const courses = [
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 100,
    discount: 20,
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-09"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum2/1200/1000.jpg",
    rating: 4.8,
    students: 150,
    price: 120,
    discount: 15,
    category: {
      name: "Math",
      color: "#F2994A",
      backgroundColor: "#FFF2E8",
    },
    createAt: new Date("24-06-10"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum3/1200/1000.jpg",
    rating: 4.2,
    students: 75,
    price: 80,
    discount: 10,
    category: {
      name: "Writing",
      color: "#4CAF50",
      backgroundColor: "#E8F0F7",
    },
    createAt: new Date("24-06-11"),
  },

  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 100,
    discount: 0, // Original discount
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-12"),
  },
  {
    title: "Beginner to Pro in Excel: Financial Modeling and Valuation",
    imageSrc: "https://picsum.photos/seed/picsum/1200/1000.jpg",
    rating: 4.5,
    students: 100,
    price: 0,
    discount: 0, // Increased discount
    category: {
      name: "Phonics",
      color: "#342F98",
      backgroundColor: "#EBEBFF",
    },
    createAt: new Date("24-06-13"),
  },
];

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
      <RelatedCourse courseList={courses.slice(0, 5)} />
      <Footer />
    </div>
  );
};

export default SingleCourseMainPage;
