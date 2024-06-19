// import style from "./FavouriteIcon.module.css";
import FavouriteSVG from "../../../assets/svg/FavouriteIcon.svg";
import style from "./FavouritesIcon.module.css";
import React from "react";

const FavouriteIcon = () => {
  return (
    <div className={style.icon}>
      <FavouriteSVG />
    </div>
  );
};

export default FavouriteIcon;
