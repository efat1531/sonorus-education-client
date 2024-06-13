import style from "./NavListDesktop.module.css";

const NavList = () => {
  return (
    <ul className={style.ul}>
      <li className={style.li}>
        <a href="/" className={style.a}>
          Home
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Why Learn
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          About
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Contact
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Resourses
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Courses
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Shop
        </a>
      </li>
      <li className={style.li}>
        <a href="#" className={style.a}>
          Blog
        </a>
      </li>
    </ul>
  );
};

export default NavList;
