import React, { useEffect, useState } from "react";

import PropTypes from "prop-types";

// SVG Imports
import BarChart from "./BarChart.svg";
import Clock from "./Clock.svg";
import NoteBook from "./NoteBook.svg";
import Students from "./Students.svg";
import Monitor from "./Monitor.svg";
import NotePad from "./NotePad.svg";
import Stack from "./Stack.svg";
import CopyIcon from "./CopyIcon.svg";
import FolderIcon from "./Folder.svg";
import PlayCircleIcon from "./PlayCircle.svg";
import Star from "./Star.svg";
import PlayerIcon from "./PlayerIcon.svg";

const svgMap = {
  BarChart,
  Clock,
  NoteBook,
  Students,
  Monitor,
  NotePad,
  Stack,
  CopyIcon,
  FolderIcon,
  PlayCircleIcon,
  Star,
  PlayerIcon,
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
