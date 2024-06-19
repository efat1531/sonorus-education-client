import React from "react";
import style from "./FooterMinimal.module.css";

const FooterMinimal = () => {
  return (
    <div className={style.mainContainer}>
      <div className={style.copyRight}>
        &copy; 2024 All Rights Reserved to{" "}
        <a href="#" className={style.companyName}>
          Sonorus Education
        </a>
        . Developed by{" "}
        <a href="#" className={style.developer}>
          Alpha Coders
        </a>
        . Designed by Templatecookie.
      </div>
      <div className={style.supportLinks}>
        <span>FAQs</span>
        <span>Privacy Policy</span>
        <span>Terms & Conditions</span>
      </div>
    </div>
  );
};

export default FooterMinimal;
