import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer"

function HabitSection() {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];


  useEffect(() => {
    setHabits(storedHabits);
    console.log(storedHabits)
  }, []);


  const handleOpen = () => {
    console.log("The Model Open Coming This Log is coming from the habitSection component");
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    console.log(`You have ${storedHabits.length + 1} habits saved`)
  };

  const handleSave = (newHabit) => {
    setHabits([...habits, newHabit]);
    handleClose();
  };


  const handleDelete = (id) => {
    const listItems = habits.filter((item) => item.id !== id);
    localStorage.setItem('habits', JSON.stringify(listItems));
    setHabits(listItems);
    console.log(`You have ${storedHabits.length - 1} habits saved`)
  };



  const containersStyles = {
    height: "auto",
  };

  return (
    <>
      <div style={containersStyles} className="column">
        <Subheading title="Habits" />
        <HabitContainer habits={habits} deleteFunction={handleDelete}  />
        <CustomButton title="Create New Habit" onClick={handleOpen} />
        <HabitForm open={open} onClose={handleClose} onSave={handleSave} />
      </div>
    </>
  );
}

export default HabitSection;