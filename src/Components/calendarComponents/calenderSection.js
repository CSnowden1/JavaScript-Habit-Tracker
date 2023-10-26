import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import Switch from "../reusableComponents/filter";
import CalenderBar from "./calanderBar";
import CustomContainer from '../reusableComponents/container';
import { useAuth } from "../../Context/authContext";

function CalendarSection({ habitsChanged, onHabitsChange, theme }) {
  const [selectedOption, setSelectedOption] = useState("option1");
  const [habits, setHabits] = useState([]);
  //const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];

 // useEffect(() => {
  //  setHabits(storedHabits);
 //}, [storedHabits]);
 const { user } = useAuth();
 const userId = user ? user.user._id : null;

 async function fetchHabitsFromServer(userId) {
   try {
     const response = await fetch(`http://localhost:5000/users/${userId}`, {
       method: "GET",
       headers: {
         "Content-Type": "application/json",
       },
     });

     if (response.ok) {
       const habits = await response.json();
       console.log(habits);
       const habitData = habits.user.habits;
       return habitData;
     } else {
       console.error("Failed to fetch habits from the server");
       return [];
     }
   } catch (error) {
     console.error(error);
     return [];
   }
 }

 useEffect(() => {
   // Define an async function to fetch habits and update the state
   const fetchAndSetHabits = async () => {
     const habitsData = await fetchHabitsFromServer(userId);
     setHabits(habitsData);
     onHabitsChange();
   };

   // Check if habitsChanged prop changed, if it did, fetch new habits
   if (habitsChanged) {
     fetchAndSetHabits();
   }
 }, [habitsChanged, userId, onHabitsChange]);

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
      <div  >
        <Subheading theme={theme} title="Calendar" />
        <Switch
          options={options}
          selectedOption={selectedOption}
          onChange={handleOptionChange}
          theme={theme}
        />
        <CustomContainer theme={theme} id="calendar-container">
          {filteredHabits.map((habit) => (
            <CalenderBar key={habit._id} habit={habit} />
          ))}
        </CustomContainer>
      </div>
    </>
  );

}

export default CalendarSection;