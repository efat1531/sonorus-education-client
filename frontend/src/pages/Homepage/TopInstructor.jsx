import style from "./TopInstructor.module.css";
import InstructorCard from "../../components/uitls/Cards/InstructorCard";

// Max 4 Instructor.
const TopInstructor = () => (
  <>
    <section className={style.mainContainer}>
      <header className={style.header}>
        <h1 className={style.title}>Instructor</h1>
      </header>
      <div className={style.cardContainer}>
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
        <InstructorCard />
      </div>
    </section>
  </>
);

export default TopInstructor;
