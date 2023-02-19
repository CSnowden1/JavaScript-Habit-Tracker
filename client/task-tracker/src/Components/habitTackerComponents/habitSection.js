import { useState } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import Switch from "../reusableComponents/filter";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer"


function HabitSection() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    console.log("The Model Ope")
    setOpen(true);

  }
  const handleClose = () => setOpen(false);
  const handleSave = (data) => {
    // handle save logic here
    console.log(data);
  };
  const [selectedOption, setSelectedOption] = useState("option1");
  const options = [
    { label: "Option 1", value: "option1" },
    { label: "Option 2", value: "option2" },
    { label: "Option 3", value: "option3" },
  ];
  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };
  const containersStyles = {
    height: "auto",
  };

  return (
    <>
      <div style={containersStyles} className="column">
        <Subheading title="Habits" />
        <Switch
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
        <HabitContainer />
        <CustomButton title="Create New Habit" onClick={handleOpen} />
        <HabitForm open={open} onClose={handleClose} onSave={handleSave} />
      </div>
    </>
  );
}

export default HabitSection;


