import style from "./SingleCourse.module.css";
import CourseTitle from "./CourseTitle";
import VideoPlayer from "../../components/uitls/Cards/VideoPlayer";
import MenuList from "./MenuList";

const SingleCourse = () => {
  return (
    <div className={style.mainContainer}>
      <CourseTitle />
      <VideoPlayer width={872} height={492} videoID={`DCoIeGt4g7M`} />
      <MenuList />
    </div>
  );
};

export default SingleCourse;
