import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import Switch from "../reusableComponents/filter";
import CalenderBar from "./calanderBar";
import CustomContainer from '../reusableComponents/container';

function CalendarSection() {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [habits, setHabits] = useState([]);
  const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];

  useEffect(() => {
    setHabits(storedHabits);
  }, [storedHabits]);

  useEffect(() => {
    console.log("Selected option:", selectedOption);
  }, []);

  const options = [
    { label: "All Day", value: "option1" },
    { label: "Morning", value: "morning" },
    { label: "Afternoon", value: "afternoon" },
    { label: "Night", value: "night" },
  ];

  const handleOptionChange = (value) => {
    console.log("Selected option:", value);
    setSelectedOption(value);
  };

  const filterHabitsByTimeOfDay = (habits) => {
    switch (selectedOption) {
      case "option1":
        return habits;
      case "morning":
        return habits.filter((habit) => habit.time === "morning");
      case "afternoon":
        return habits.filter((habit) => habit.time === "afternoon");
      case "night":
        return habits.filter((habit) => habit.time === "night");
      default:
        return habits;
    }
  };

  const filteredHabits = filterHabitsByTimeOfDay(habits);

  return (
    <>
      <div >
        <Subheading title="Calendar" />
        <Switch
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
        <CustomContainer id="calendar-container">
          {filteredHabits.map((habit) => (
            <CalenderBar key={habit.id} habit={habit} />
          ))}
        </CustomContainer>
      </div>
    </>
  );
}

export default CalendarSection;