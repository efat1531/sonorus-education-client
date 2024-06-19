import React from "react";
// import style from "./ErrorPage.module.css";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";
import MainErrorPage from "./MainErrorPage";
import FooterMinimal from "../../components/Footer/FooterMinimal";

const ErrorPage = () => {
  return (
    <div>
      <NavBarDesktop />
      <MainErrorPage />
      <FooterMinimal />
    </div>
  );
};

export default ErrorPage;
