import style from "./NavBarDesktop.module.css";
import NavList from "./NavListDekstop";
import Logo from "../uitls/Logo";
import CreateAccountButton from "../uitls/Buttons/CreateAccount";
import SignInButton from "../uitls/Buttons/SignInButton";
import NavImage from "../uitls/ImageCovers/NavImage";
import NotificationIcon from "../uitls/Icons/NotificationIcon";
import FavouriteIcon from "../uitls/Icons/FavouritesIcon";
import ShoppingCartIcon from "../uitls/Icons/ShoppingCartIcon";

const NavBarDesktop = () => {
  const user = true;
  return (
    <>
      <NavList />
      <div className={style.navLogoButton}>
        <Logo />
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
    </>
  );
};

export default NavBarDesktop;
