import { useState } from "react";
import './App.css';
import 'semantic-ui-css/semantic.min.css';
import NavBar from "./Components/navComponents/nav"
import HabitSection from "./Components/habitTackerComponents/habitSection";
import CalendarSection from "./Components/calendarComponents/calanderSection";
import Footer from "./Components/bodyComponents/footer"


function App() {
  const [habitsChanged, setHabitsChanged] = useState(false);

  const handleHabitsChange = () => {
    setHabitsChanged(!habitsChanged);
  }






  return (
    <div className="App ui stackable column grid">
        <div  className="row top-menu">
          <div className="column">
            <NavBar />
          </div>
        </div>
        <div  className="row stretched">
          <div className="seven wide column">
            <CalendarSection habitsChanged={habitsChanged} />
          </div>
          <div  className="nine wide column">
            <HabitSection onHabitsChange={handleHabitsChange} />
          </div>
        </div>
        <div className="row">
          <Footer />
        </div>
    </div>
  );
}

export default App;