import style from "./ShareSocial.module.css";
import SVGController from "../../../assets/svg/SVGController";
import React from "react";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const ShareSocial = () => {
  const location = window.location.href;
  const onCopyClick = () => {
    navigator.clipboard.writeText(location);
    toast.success("Link Copied!", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
  };

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
        <div className={style.copyText} onClick={onCopyClick}>
          Copy course link
        </div>
      </div>
    </div>
  );
};

export default ShareSocial;
