import BellSVG from "../../../assets/svg/Bell.svg";
import style from "./NotificationIcon.module.css";
import React from "react";

const numOfNotification = 0;

const NotificationIcon = () => {
  return (
    <div className={style.notificationIcon}>
      <BellSVG />
      {numOfNotification > 0 && (
        <div className={style.notificationDot}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="8px"
            height="8px"
            fill="none"
            style={{ position: "inherit" }}
          >
            <circle cx="4.59375" cy="5" r="4" fill="#FF6636" stroke="white" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
