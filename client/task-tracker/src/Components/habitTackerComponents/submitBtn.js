// CustomButton.js
import React from "react";
import { Button } from "semantic-ui-react";

function CustomButton({ title, isModuleVisible, setModuleVisible }) {
  const buttonStyles = {
    // ... (existing styles)
  };

  const handleButtonClick = () => {
    setModuleVisible(!isModuleVisible);
  };

  return (
    <Button style={buttonStyles} onClick={handleButtonClick}>
      {title}
    </Button>
  );
}

export default CustomButton;
