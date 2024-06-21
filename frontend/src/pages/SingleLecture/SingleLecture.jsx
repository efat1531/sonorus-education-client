import React from "react";
import style from "./SingleLecture.module.css";
import PropTypes from "prop-types";
import NavBarDesktop from "../../components/NavBar/NavBarDesktop";

const SingleLecture = ({ lecture }) => {
  return (
    <>
      <NavBarDesktop />
    </>
  );
};

SingleLecture.propTypes = {
  lecture: PropTypes.object,
};

export default SingleLecture;
