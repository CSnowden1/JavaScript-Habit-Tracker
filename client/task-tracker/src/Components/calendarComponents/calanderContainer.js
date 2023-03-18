import { useState, useEffect } from "react";
import CalenderBar from "./calanderBar";


function CalanderContainer() {
  const [habits, setHabits] = useState([]);
  const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];


  useEffect(() => {
    setHabits(storedHabits);
    console.log(storedHabits)
  }, []);


  return (
    <>
      <div style={containersStyles} className="column">
        {habits.map((habit) => (
            <CalenderBar key={habit.id} habit={habit}  />
        ))}
      </div>
    </>
  );
}


const containersStyles = {
  height: "auto",
};



export default CalanderContainer