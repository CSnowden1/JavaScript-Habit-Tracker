import { Button } from "semantic-ui-react";
import '../../Styles/switch.css';



const Switch = ({ options, selectedOption, onChange }) => {

  const filterStyles = {
    height: '2.5rem',
    width: 'auto',
    padding: '1rem',
    marginBottom: '1rem'
  }

  const buttonStyles = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    backgroundColor: "#fff",
    border: "none",
    textAlign: "center",
    cursor: "pointer",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
  };

  const activeButtonStyles = {
    backgroundColor: '#2185d0',
    color: '#fff',
  }

  return (
    <div style={filterStyles} className="switch">
      {options.map((option) => (
        <Button
          key={option.value}
          className={`switch-button ${
            option.value === selectedOption ? "active" : null
          }`}
          style={
            option.value === selectedOption ? activeButtonStyles : buttonStyles
          }
          onClick={() => onChange(option.value)}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
};

export default Switch;