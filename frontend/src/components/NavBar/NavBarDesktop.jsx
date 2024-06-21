import style from "./NavBarDesktop.module.css";
import NavList from "./NavListDekstop";
import Logo from "../uitls/Logo";
import CreateAccountButton from "../uitls/Buttons/CreateAccount";
import SignInButton from "../uitls/Buttons/SignInButton";
import NavImage from "../uitls/ImageCovers/NavImage";
import NotificationIcon from "../uitls/Icons/NotificationIcon";
import FavouriteIcon from "../uitls/Icons/FavouritesIcon";
import ShoppingCartIcon from "../uitls/Icons/ShoppingCartIcon";
import PropTypes from "prop-types";
import React from "react";

const logoStyle = {
  width: "2.5rem",
  height: "2.5rem",
};

const logoTextStyle = {
  color: "var(--Gray-900, #1D2026)",
  fontSize: "2rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "124%" /* 2.48rem */,
  letterSpacing: "-0.06rem",
};

const NavBarDesktop = ({ children }) => {
  const user = false;
  return (
    <>
      <NavList />
      <div className={style.navLogoButton}>
        <Logo logoStyle={logoStyle} textStyle={logoTextStyle} />
        {!user && (
          <div className={style.navAuthButton}>
            <CreateAccountButton />
            <SignInButton />
          </div>
        )}
        {user && (
          <div className={style.navProfileButton}>
            <NotificationIcon />
            <FavouriteIcon />
            <ShoppingCartIcon />
            <NavImage />
          </div>
        )}
      </div>
      {children ? children : <></>}
    </>
  );
};

NavBarDesktop.propTypes = {
  children: PropTypes.node,
};

export default NavBarDesktop;
