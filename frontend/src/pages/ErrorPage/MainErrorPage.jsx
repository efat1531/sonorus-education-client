import React from "react";
import style from "./MainErrorPage.module.css";

const MainErrorPage = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.errorContainer}>
        <div className={style.errorHeading}>
          <div className={style.errorHeadingText}>Error 404</div>
          <div className={style.subText}>Oops! page not found</div>
        </div>
        <div className={style.errorText}>
          Something went wrong. It&apos;s look that your requested could not be
          found. It&apos;s look like the link is broken or the page is removed.
        </div>
        <button className={style.backBtn}>
          <span>Go Back</span>
        </button>
      </div>
      <div className={style.pictureContainer}>
        <img src="/src/assets/images/Error404.png" />
      </div>
    </div>
  );
};

export default MainErrorPage;
