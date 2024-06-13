import style from "./ImageLinks.module.css";
import Proptypes from "prop-types";

const iconURL = "src/assets/svg/";

const ImageLinks = ({ social }) => {
  return (
    <div className={style.logo}>
      <img src={`${iconURL}${social.filename}`} alt={social.label} />
    </div>
  );
};

ImageLinks.propTypes = {
  social: Proptypes.object.isRequired,
};

export default ImageLinks;
