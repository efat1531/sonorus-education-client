import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// SVG Imports
import BarChart from "./BarChart.svg";
import Clock from "./Clock.svg";
import NoteBook from "./NoteBook.svg";
import Students from "./Students.svg";

const svgMap = {
  BarChart,
  Clock,
  NoteBook,
  Students,
};

const SVGController = ({
  name,
  width = "1.5rem",
  height = "1.5rem",
  fill = "none",
  stroke = "none",
}) => {
  const SvgComponent = svgMap[name];

  return SvgComponent ? (
    <SvgComponent width={width} height={height} fill={fill} stroke={stroke} />
  ) : null;
};

SVGController.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  fill: PropTypes.string,
  stroke: PropTypes.string,
};

export default SVGController;
