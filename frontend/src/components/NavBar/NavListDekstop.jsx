import style from "./NavListDesktop.module.css";
import React from "react";
import { NavLink } from "react-router-dom";

const NavList = () => {
  return (
    <ul className={style.ul}>
      <li className={style.li}>
        <NavLink to="/" className={style.a}>
          Home
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/why-learn" className={style.a}>
          Why Learn
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/about-us" className={style.a}>
          About
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/contact" className={style.a}>
          Contact
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/resources" className={style.a}>
          Resourses
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/courses" className={style.a}>
          Courses
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/shop" className={style.a}>
          Shop
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/blog" className={style.a}>
          Blog
        </NavLink>
      </li>
      <li className={style.li}>
        <NavLink to="/become-an-instructor" className={style.a}>
          Become an Instructor
        </NavLink>
      </li>
    </ul>
  );
};

export default NavList;
