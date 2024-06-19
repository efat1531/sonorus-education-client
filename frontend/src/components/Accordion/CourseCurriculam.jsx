import style from "./CourseCurriculam.module.css";
import IconTextLabel from "../uitls/Label/IconTextLabel";
import CourseCurriculamCard from "../uitls/Cards/CourseCurriculamCard";
import Divider from "../uitls/Divider";
import React from "react";

const demoCurriculam = [
  {
    id: 1,
    title: "Introduction",
    lessons: [
      {
        id: 12,
        title: "Welcome to the course",
        duration: 5,
        type: "video",
      },
      {
        id: 23,
        title: "What is React",
        duration: 10,
        type: "video",
      },
      {
        id: 34,
        title: "First React App",
        type: "resource",
      },
    ],
  },
  {
    id: 2,
    title: "Setting up the environment",
    lessons: [
      {
        id: 13,
        title: "Installing Node",
        duration: 5,
        type: "video",
      },
      {
        id: 24,
        title: "Installing Visual Studio Code",
        duration: 10,
        type: "video",
      },
    ],
  },
  {
    id: 3,
    title: "Creating your first React app",
    lessons: [
      {
        id: 14,
        title: "Creating a new React app",
        duration: 5,
        type: "video",
      },
      {
        id: 25,
        title: "Exploring the project structure",
        duration: 10,
        type: "video",
      },
    ],
  },
];

const totalSections = demoCurriculam.length;
const totalDuration = demoCurriculam.reduce((acc, curr) => {
  return (
    acc +
    curr.lessons
      .filter((lesson) => lesson.type !== "resource")
      .reduce((total, lesson) => total + (lesson.duration || 0), 0)
  );
}, 0);
const totalLesson = demoCurriculam.reduce((acc, curr) => {
  return (
    acc + curr.lessons.filter((lesson) => lesson.type !== "resource").length
  );
}, 0);

const convertDuration = (duration) => {
  const hours = Math.floor(duration / 60);
  const minutes = duration % 60;
  return `${hours}h ${minutes}m`;
};

const CourseCurriculam = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.heading}>
        <div className={style.title}>Curriculam</div>
        <div className={style.funFact}>
          <IconTextLabel
            iconStyle={{ name: "FolderIcon", stroke: "#FF6636" }}
            text={`${totalSections} Sections`}
          />
          <IconTextLabel
            iconStyle={{ name: "PlayCircleIcon", stroke: "#564FFD" }}
            text={`${totalLesson} Lessons`}
          />
          <IconTextLabel
            iconStyle={{ name: "Clock", stroke: "#FD8E1F" }}
            text={convertDuration(totalDuration)}
          />
        </div>
      </div>
      <div className={style.curriculamContainer}>
        {demoCurriculam.map((section) => (
          <div key={section.id}>
            <CourseCurriculamCard courseSection={section} key={section.id} />
            <Divider width="100%" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCurriculam;
