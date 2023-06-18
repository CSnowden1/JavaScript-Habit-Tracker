import { useState } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./Components/navComponents/nav";
import HabitSection from "./Components/habitTackerComponents/habitSection";
import CalendarSection from "./Components/calendarComponents/calanderSection";
import Footer from "./Components/bodyComponents/footer";
import Overview from "./Components/habitProgress/overviewContainer";

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

  const bodyStyles = {
    minHeight: "100vh",
    minWidth: "100vw",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme !== "light" ? "black" : "white",
  };

  const navRow = {
    display: 'flex',
    width: '100%',
    height: "10%",
    marginBottom: "1rem",
  };

  const ChatRow = {
    display: 'flex',
    width: '100%',
    height: "20%",
    marginBottom: "1rem",
  }

  const habitRow = {
    flexGrow: '1',
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: '3rem',
  };

  const calendarColumn = {
    height: "100%",
    display: "flex",
    width: 'auto',
    justifyContent: "center",
    alignContent: "center",
    height: '30rem',
    overflowY: 'scroll',
  };

  const habitColumn = {
    height: "100%",
    display: "flex",
    width: 'auto',
    justifyContent: "center",
    alignContent: "center",
    height: '30rem',
    overflowY: 'scroll',
  };

  const footerRow = {
    height: "10%",
    marginBottom: ".25rem",
  };


  const submitRow = {
    height: "10%",
    marginBottom: ".25rem",
  };

  return (
    <div className={`App ${theme}`}>
      <div style={bodyStyles}>
        <div style={navRow}>
            <NavBar theme={theme} handleToggleDarkMode={handleToggleDarkMode} />
        </div>
        <div style={ChatRow}>
          <Overview habitsChanged={habitsChanged} />
        </div>
        <div style={habitRow} >
          <div
            style={calendarColumn}
          >
            <CalendarSection habitsChanged={habitsChanged} />
          </div>
          <div
            style={habitColumn}
          >
            <HabitSection onHabitsChange={handleHabitsChange} />
          </div>
        </div>
        <div style={submitRow}>
          <SubmitBtn />
        </div>
        <div style={footerRow}>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
