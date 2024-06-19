import style from "./InstructorCard.module.css";
import React from "react";

const rating = 5;
const count = 2759;
const description = `student${count < 2 ? "" : "s"}`;
const imageURL =
  "https://cdn.builder.io/api/v1/image/assets/TEMP/f50fdda79c58e6003124c096bb51d2502f636c820f1fbd1bda8c0089e11a7df7?apiKey=23afa202bc2b43d8bffafdcae0891485&";
const name = "Mahadi Ahmed";
const title = "English Lecturer";

const InstructorCard = () => {
  return (
    <section className={style.profileCard}>
      <img
        loading="lazy"
        src={imageURL}
        className={style.profileImage}
        alt={`Profile picture of ${name}`}
      />
      <div className={style.profileInfo}>
        <h2 className={style.profileName}>{name}</h2>
        <p className={style.profileTitle}>{title}</p>
      </div>
      <hr className={style.divider} />
      <div className={style.profileDetails}>
        <div className={style.rating}>
          ⭐ <div>{rating}</div>
        </div>
        <div className={style.stats}>
          <div className={style.statsCount}>{count}</div>
          <div className={style.statsDescription}>&nbsp;{description}</div>
        </div>
      </div>
    </section>
  );
};

export default InstructorCard;
