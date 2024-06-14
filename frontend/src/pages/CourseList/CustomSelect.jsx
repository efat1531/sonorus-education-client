import style from "./CustomSelect.module.css";
import ReactSelect from "react-select";
import PropTypes from "prop-types";

const CustomSelect = ({ options, setSelectedOption, selectedOption }) => {
  const customStyles = {
    control: (provided, state) => {
      return {
        ...provided,
        width: "12.5rem",
        height: "2.5rem",
        borderRadius: "0.25rem",
        border: "0.0625rem solid #E5E5E5",
        cursor: "pointer",
        boxShadow: "none",
        "&:hover": {
          border: "0.0625rem solid #E5E5E5",
        },
      };
    },
    option: (provided, state) => {
      const hoverColor = state.data.hoverColor;
      const textColor = state.data.textColor;
      console.log(provided, hoverColor, textColor, state);
      return {
        ...provided,
        backgroundColor: state.isSelected
          ? hoverColor
          : state.isFocused
          ? hoverColor
          : "#fff",
        color: state.isSelected
          ? textColor
          : state.isFocused
          ? textColor
          : "#000",
      };
    },
  };
  return (
    <div>
      <ReactSelect
        className={style.select}
        styles={customStyles}
        value={selectedOption}
        onChange={setSelectedOption}
        options={options}
      />
    </div>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default CustomSelect;
