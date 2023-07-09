import React, { useState } from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./Components/navComponents/nav";
import HabitSection from "./Components/habitTackerComponents/habitSection";
import CalendarSection from "./Components/calendarComponents/calenderSection";
import Overview from "./Components/habitProgress/overviewContainer";
import SubmitBtn from "./Components/habitTackerComponents/submitBtn";
import Greeting from "./Components/greetingComponent/greeting";
import "./App.css";

function App() {
  const [habitsChanged, setHabitsChanged] = useState(false);
  const [theme, setTheme] = useState("light");

  const handleHabitsChange = () => {
    setHabitsChanged(!habitsChanged);
  };

  const handleToggleDarkMode = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    const link = document.getElementById("theme-link");
    const linkDark = document.getElementById("theme-link-dark");

    if (newTheme === "light") {
      link.disabled = false;
      linkDark.disabled = true;
    } else {
      link.disabled = true;
      linkDark.disabled = false;
    }
  };


const lightDark = {
  backgroundColor: theme !== "light" ? "black" : "white",
}

  return (
    <div className={`App ${theme}`}>
      <div style={lightDark} className="bodyStyles">
        <div className="navRow">
          <NavBar theme={theme} handleToggleDarkMode={handleToggleDarkMode} />
        </div>
        <div className="greetingRow">
          <Greeting time="Evening" name="Chris" day="Sunday" />
        </div>
        <div className="ChatRow">
          <Overview habitsChanged={habitsChanged} />
        </div>
        <div className="habitRow">
          <div className="calendarColumn">
            <CalendarSection habitsChanged={habitsChanged} />
          </div>
          <div className="habitColumn">
            <HabitSection onHabitsChange={handleHabitsChange} />
          </div>
        </div>
        <div className="submitRow">
          <SubmitBtn />
        </div>
        <div className="footerRow"></div>
      </div>
    </div>
  );
}

export default App;
