import style from "./SingleCourse.module.css";
import CourseTitle from "./CourseTitle";
import VideoPlayer from "../../components/uitls/Cards/VideoPlayer";
import MenuList from "./MenuList";
import CourseDesciption from "./CourseDescription";
import WhatYouWillLearn from "./WhatYouWillLearn";
import CourseRequirement from "./CourseRequirement";
import CourseCurriculam from "../../components/Accordion/CourseCurriculam";
import TeacherInfo from "./TeacherInfo";
import WriteReview from "./WriteReview";
import CourseRating from "./CourseRating";
import StudentsRating from "./StudentsRating";
import React from "react";

const SingleCourse = () => {
  return (
    <div className={style.mainContainer}>
      <CourseTitle />
      <VideoPlayer width={872} height={492} videoID={`DCoIeGt4g7M`} />
      <MenuList />
      <CourseDesciption />
      <WhatYouWillLearn />
      <CourseRequirement />
      <CourseCurriculam />
      <TeacherInfo />
      <WriteReview />
      <CourseRating />
      <StudentsRating />
    </div>
  );
};

export default SingleCourse;
