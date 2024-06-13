import style from "./Footer.module.css";
import ImageLinks from "./ImageLinks";
import QuickLink from "./QuickLinks";

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
      <div className={style.footerContent}>
        <section className={style.aboutSection}>
          <div>
            <div className={style.logoContainer}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/c99b0a1e3a46544a9b428a8bc85de3eb00a356fc4d736550ce52d431f080f2cb?apiKey=23afa202bc2b43d8bffafdcae0891485&"
                alt="Sonorous Logo"
                className={style.logo}
              />
              <div className="title">Sonorous</div>
            </div>
            <p className={style.description}>
              Aliquam rhoncus ligula est, non pulvinar elit convallis nec. Donec
              mattis odio at.
            </p>
          </div>
          <div className={style.socialIcons}>
            {socialLinks.map((socialLink, index) => (
              <ImageLinks key={index} social={socialLink} />
            ))}
          </div>
        </section>
        <section className={style.linksSection}>
          <div className={style.quickLinks}>
            <h2>Quick Links</h2>
            <QuickLink label="About" />
            <QuickLink label="Become an Instructor" />
            <QuickLink label="Contact" />
            <QuickLink label="Developers" />
          </div>
          <div className={style.supportLinks}>
            <h2>Support</h2>
            <QuickLink label="Help Center" />
            <QuickLink label="FAQs" />
            <QuickLink label="Terms & Condition" />
            <QuickLink label="Privacy Policy" />
          </div>
        </section>
      </div>
      <div className={style.footerBottom}>
        <p className={style.footerNote}>
          © 2023 - <span>Sonorous English Learning</span>. Designed by{" "}
          <span>Alpha Coders</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
