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
import PropType from "prop-types";
import userData from "../../../Data/userData.json";

const SingleCourse = ({ course }) => {
  console.log(course);
  const instructorInfo = userData.find(
    (users) => users.userID === course.instructor
  );
  return (
    <div className={style.mainContainer}>
      <CourseTitle course={course} />
      <VideoPlayer width={872} height={492} videoID={course.introVideo} />
      <MenuList />
      <CourseDesciption description={course.description} />
      <WhatYouWillLearn learning={course.whatYouWillLearn} />
      <CourseRequirement courseRequirements={course.requirements} />
      <CourseCurriculam curriculam={course.curriculam} />
      <TeacherInfo instructorInfo={instructorInfo} />
      <WriteReview />
      <CourseRating />
      <StudentsRating />
    </div>
  );
};

SingleCourse.propTypes = {
  course: PropType.object.isRequired,
};

export default SingleCourse;
