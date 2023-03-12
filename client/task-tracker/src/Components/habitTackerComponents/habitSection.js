import { useState } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer"

function HabitSection() {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);

  const handleOpen = () => {
    console.log("The Model Open");
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const handleSave = (newHabit) => {
    setHabits([...habits, newHabit]);
    handleClose();
  };

  const containersStyles = {
    height: "auto",
  };

  return (
    <>
      <div style={containersStyles} className="column">
        <Subheading title="Habits" />
        <HabitContainer habits={habits} />
        <CustomButton title="Create New Habit" onClick={handleOpen} />
        <HabitForm open={open} onClose={handleClose} onSave={handleSave} />
      </div>
    </>
  );
}

export default HabitSection;