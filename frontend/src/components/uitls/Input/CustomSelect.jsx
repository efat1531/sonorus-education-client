import style from "./CustomSelect.module.css";
import ReactSelect, { components } from "react-select";
import PropTypes from "prop-types";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

const DropdownIndicator = (props) => {
  const { isOpen } = props;
  return (
    <components.DropdownIndicator {...props}>
      <div style={{ transform: isOpen ? "rotate(180deg)" : "none" }}>
        <FontAwesomeIcon icon={faChevronDown} />
      </div>
    </components.DropdownIndicator>
  );
};

const Placeholder = (props) => {
  return (
    <components.Placeholder {...props}>{props.children}</components.Placeholder>
  );
};

const CustomSelect = ({
  options,
  setSelectedOption,
  selectedOption = null,
  customPlaceholder,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const customComponents = {
    DropdownIndicator: (props) => (
      <DropdownIndicator {...props} isOpen={isOpen} />
    ),
    Placeholder: (props) => (
      <Placeholder {...props} children={customPlaceholder} />
    ),
  };

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
    <ReactSelect
      styles={customStyles}
      components={customComponents}
      options={options}
      onChange={setSelectedOption}
      value={selectedOption}
      onMenuOpen={() => setIsOpen(true)}
      onMenuClose={() => setIsOpen(false)}
    />
  );
};

CustomSelect.propTypes = {
  options: PropTypes.array.isRequired,
  setSelectedOption: PropTypes.func.isRequired,
  selectedOption: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
  customPlaceholder: PropTypes.string,
};

export default CustomSelect;
