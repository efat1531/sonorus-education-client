import style from "./LabelOff.module.css";

const LabelOff = ({ percentage }) => {
  return (
    <div className={style.mainContainer}>
      <div className={style.labelOff}>{Math.round(percentage)}%&nbsp;off</div>
    </div>
  );
};

export default LabelOff;
