import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import Switch from "../reusableComponents/filter";
import CalanderContainer from "./calanderContainer";

function CalendarContainer() {
  const [localStorageData, setLocalStorageData] = useState(
    localStorage.getItem("habits") || []
  );
  const [selectedOption, setSelectedOption] = useState("option1");

  useEffect(() => {
    const handleStorageChange = () => {
      setLocalStorageData(localStorage.getItem("habits") || []);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const options = [
    { label: "All Day", value: "option1" },
    { label: "Morning", value: "option2" },
    { label: "Afternoon", value: "option3" },
    { label: "Night", value: "option4" },
  ];

  const handleOptionChange = (value) => {
    setSelectedOption(value);
  };

  const filterHabitsByTimeOfDay = (habits) => {
    switch (selectedOption) {
      case "option1":
        // Show all habits
        return habits;
      case "option2":
        // Show only morning habits
        return habits.filter((habit) => habit.time === "morning");
      case "option3":
        // Show only afternoon habits
        return habits.filter((habit) => habit.time === "afternoon");
      case "option4":
        // Show only night habits
        return habits.filter((habit) => habit.time === "night");
      default:
        return habits;
    }
  };

  const filteredHabits = filterHabitsByTimeOfDay(JSON.parse(localStorageData));

  const calendarStyles = {
    height: "100%",
  };

  return (
    <>
      <div style={calendarStyles} class="column">
        <Subheading title="Calendar" />
        <Switch
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
        />
        <CalanderContainer localStorageData={JSON.stringify(filteredHabits)} />
      </div>
    </>
  );
}

export default CalendarContainer;