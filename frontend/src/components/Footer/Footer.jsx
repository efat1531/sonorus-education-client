import style from "./Footer.module.css";
import ImageLinks from "./ImageLinks";
import QuickLink from "./QuickLinks";
import React from "react";
import Logo from "../uitls/Logo";

const logoStyle = {
  width: "2.875rem",
  height: "2.875rem",
};

const logoTextStyle = {
  color: "var(--Gray-White, #FFF)",
  textAlign: "justify",
  fontSize: "2.3rem",
  fontStyle: "normal",
  fontWeight: 600,
  lineHeight: "124%" /* 2.852rem */,
  letterSpacing: "-0.069rem",
};

const socialLinks = [
  {
    filename: "Facebook.svg",
    link: "#",
    label: "Facebook",
  },
  {
    filename: "Instagram.svg",
    link: "#",
    label: "Instragram",
  },
  {
    filename: "Linkedin.svg",
    link: "#",
    label: "Linkedin",
  },
  {
    filename: "Twitter.svg",
    link: "#",
    label: "Twitter",
  },
  {
    filename: "Youtube.svg",
    link: "#",
    label: "Youtube",
  },
];

const Footer = () => {
  return (
    <footer className={style.footerContainer}>
      <div className={style.footerMain}>
        <div className={style.logoContainer}>
          <div className={style.logoText}>
            <Logo logoStyle={logoStyle} textStyle={logoTextStyle} />
            <div className={style.moto}>
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </div>
          </div>
          <div className={style.socialLinks}>
            {socialLinks.map((socialLink, index) => (
              <ImageLinks key={index} social={socialLink} />
            ))}
          </div>
        </div>
        <div className={style.linksContainer}>
          <div className={style.linksTitle}>Quick Links</div>
          <div className={style.links}>
            <QuickLink label="Home" />
            <QuickLink label="Carrier" />
            <QuickLink label="About" />
            <QuickLink label="Contact" />
          </div>
        </div>
        <div className={style.linksContainer}>
          <div className={style.linksTitle}>Supports</div>
          <div className={style.links}>
            <QuickLink label="Help Center" />
            <QuickLink label="FAQs" />
            <QuickLink label="Terms and Conditions" />
            <QuickLink label="Privacy Policy" />
          </div>
        </div>
      </div>
      <div className={style.footerBottom}>
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
      </div>
    </footer>
  );
};

export default Footer;
