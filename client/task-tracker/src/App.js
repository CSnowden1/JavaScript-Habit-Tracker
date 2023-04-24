import { useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import NavBar from "./Components/navComponents/nav"
import HabitSection from "./Components/habitTackerComponents/habitSection";
import CalendarSection from "./Components/calendarComponents/calanderSection";
import Footer from "./Components/bodyComponents/footer"
import Overview from "./Components/habitProgress/overviewContainer";

function App() {
  const [habitsChanged, setHabitsChanged] = useState(false);

  const handleHabitsChange = () => {
    setHabitsChanged(!habitsChanged);
  }

  const bodyStyles = {
    minHeight: '100vh',
    minWidth: '100%',
    padding: '1rem 2rem 0rem 2rem',
    display: 'flex',
    flexDirection: 'column'
  };

  const navRow = {
    height: '3rem',
    marginBottom: '2rem'
  }

  const habitRow = {
    height: 'calc(80vh - 5rem)',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center'
  }

  const calendarColumn = {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignContent: 'center',
  }

  const habitColumn = {
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }

  const footerRow = {
    height: '2rem',
    marginBottom: "1rem"
  }

  return (
    <div className="App">
      <div style={bodyStyles} className="ui grid container">
        <div style={navRow} className="row top-menu">
          <div className="column">
            <NavBar />
          </div>
        </div>
        <div className="row">
          <Overview />
        </div>
        <div style={habitRow} className="row stretched">
          <div style={calendarColumn} className="six wide column">
            <CalendarSection habitsChanged={habitsChanged} />
          </div>
          <div style={habitColumn} className="ten wide column">
            <HabitSection onHabitsChange={handleHabitsChange} />
          </div>
        </div>
        <div style={footerRow} className="row">
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;