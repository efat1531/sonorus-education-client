import style from "./ShareSocial.module.css";
import SVGController from "../../../assets/svg/SVGController";
import React from "react";

const ShareSocial = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.titleText}>Share this Course:</div>
      <div className={style.socialIcons}>
        <SVGController
          name="CopyIcon"
          height="1.5rem"
          width="1.5rem"
          stroke="var(--stroke-color)"
        />
        <div className={style.copyText}>Copy course link</div>
      </div>
    </div>
  );
};

export default ShareSocial;
