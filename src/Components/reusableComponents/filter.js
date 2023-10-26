import { Dropdown } from "semantic-ui-react";
import { useState } from "react";
import "../../Styles/switch.css";

const Switch = ({ options, selectedOption, onChange, theme }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filterStyles = {
    height: "auto",
    width: "auto",
    marginBottom: "1rem",
    
  };

  const activeButtonStyles = {
    backgroundColor: "#2185d0",
    color: "#fff",
  };

  const lightDark = {
    color: theme !== "light" ? "white" : "black",
    backgroundColor: theme !== "light" ? "black" : "white",
    borderColor: theme !== "light" ? "gray" : "black",
  };


  const dropdownOptions = options.map((option) => ({
    key: option.value,
    text: option.label,
    value: option.value,
  }));

  return (
    <div style={filterStyles} className="switch">
      <Dropdown
        fluid
        selection
        value={selectedOption}
        options={dropdownOptions}
        onChange={(e, data) => onChange(data.value)}
        className="time-dropdown"
        style={lightDark}
      />
    </div>
  );
};

export default Switch;