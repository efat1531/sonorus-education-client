import style from "./TeacherInfoCard.module.css";
const Url = `https://picsum.photos/seed/picsum/200/300`;
import { useState } from "react";

import IconTextLabel from "../../uitls/Label/IconTextLabel";

const description = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut at ultrices mi. Pellentesque porttitor tincidunt maximus. Vivamus placerat porttitor elit, in rutrum urna sollicitudin id. Phasellus ac ultrices risus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Sed et dictum dolor. Phasellus posuere scelerisque ante. Pellentesque cursus commodo lacus eu fermentum. Aliquam pellentesque, arcu pellentesque hendrerit vulputate, purus neque mattis est, in fringilla lacus nunc at arcu. Pellentesque nec cursus est. Nam et massa ac nisl facilisis iaculis. Vivamus ac lacus risus.

Sed pellentesque, dolor in congue consequat, enim elit tempor enim, vitae sodales metus augue vehicula magna. Curabitur facilisis commodo odio, a tincidunt augue interdum a. Morbi mauris ipsum, commodo vitae lectus ac, suscipit pharetra erat. Etiam iaculis enim ac mollis cursus. Sed ornare blandit mattis. Integer sodales ligula ut risus sodales, ut vehicula lectus pulvinar. Vestibulum commodo dignissim justo, vel tincidunt elit hendrerit id. Nulla nec maximus nisl, quis finibus elit. Integer pulvinar tempor feugiat. Etiam ultrices turpis non dignissim finibus. Etiam at mollis nisi. Ut nulla magna, rutrum porttitor dolor vitae, iaculis mollis justo. Integer laoreet aliquam nunc et convallis. Integer elementum ligula nec mattis ornare. Vivamus pellentesque felis vel mauris vestibulum.`;

const TeacherInfoCard = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  return (
    <div className={style.mainContainer}>
      <div
        className={style.instructorPhoto}
        style={{
          background: `url(${Url}) lightgray 50% / cover no-repeat`,
        }}
      ></div>
      <div className={style.info}>
        <div className={style.teacherInfo}>
          <div className={style.name}>Jhon Doe</div>
          <div className={style.designation}>English Lecturer</div>
        </div>
        <div className={style.funFact}>
          <IconTextLabel
            iconStyle={{
              name: "Star",
              width: "1.25rem",
              height: "1.25rem",
              fill: "#FD8E1F",
            }}
            text="4.5 Ratings"
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
          <IconTextLabel
            iconStyle={{
              name: "Students",
              width: "1.25rem",
              height: "1.25rem",
              stroke: "#564FFD",
            }}
            text="1000 Students"
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
          <IconTextLabel
            iconStyle={{
              name: "PlayerIcon",
              width: "1.25rem",
              height: "1.25rem",
              fill: "#564FFD",
            }}
            text="9 Course"
            textStyle={{
              color: "#4E5566",
              fontFamily: "Inter",
              fontSize: "0.875rem",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "1.375rem",
              letterSpacing: "-0.00875rem",
            }}
          />
        </div>
        <div className={style.bio}>
          <div
            className={isExpanded ? style.expandedText : style.collapsedText}
          >
            {description}
          </div>
          <div className={style.buttonContainer}>
            {isExpanded ? (
              <button onClick={toggleExpanded} className={style.buttonStyle}>
                Read Less
              </button>
            ) : (
              <button onClick={toggleExpanded} className={style.buttonStyle}>
                Read More
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherInfoCard;
