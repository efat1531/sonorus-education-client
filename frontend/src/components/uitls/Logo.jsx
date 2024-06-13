import GraduationCap from "../../assets/svg/GraducationCap.svg";
import style from "./Logo.module.css";

const Logo = () => {
  return (
    <a href="#" className={style.a}>
      <div className={style.logo}>
        <GraduationCap />
        <span className={style.mainText}>Sonorus</span>
      </div>
    </a>
  );
};

export default Logo;
