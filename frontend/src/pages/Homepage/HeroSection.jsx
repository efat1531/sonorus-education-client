import style from "./HeroSection.module.css";
import React from "react";

const HeroSection = () => {
  return (
    <div className={style.row}>
      <div className={style.leftColumn}>
        <h2 className={style.heroTitle}>
          <span className={style.heroTtileText}>Sonorus</span>
          &nbsp;<span className={style.heroTtileText}>Education</span>
        </h2>
        <p className={style.heroDescription}>
          The best online learning platform for students and gurdians.
        </p>
        <button className={style.heroButton}>Start Learning</button>
      </div>
      <div className={style.rightColumn}>
        <img
          className={style.heroImage}
          src="/src/assets/images/sonorusEducation.png"
          alt="Sonorus Education"
        />
      </div>
    </div>
  );
};

export default HeroSection;
