import style from "./MenuList.module.css";
import React from "react";

const MenuList = () => {
  return (
    <div className={style.menuList}>
      <div className={style.menuItem}>
        <span>Overview</span>
      </div>
      <div className={style.menuItem}>
        <span>Curricullam</span>
      </div>
      <div className={style.menuItem}>
        <span>Instructor</span>
      </div>
      <div className={style.menuItem}>
        <span>Review</span>
      </div>
    </div>
  );
};

export default MenuList;
