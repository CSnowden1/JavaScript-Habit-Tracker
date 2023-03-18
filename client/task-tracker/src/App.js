import './App.css';
import 'semantic-ui-css/semantic.min.css';
import NavBar from "./Components/navComponents/nav"
import HabitSection from "./Components/habitTackerComponents/habitSection";
import CalendarContainer from "./Components/calendarComponents/calanderSection";
import Footer from "./Components/bodyComponents/footer"


function App() {


  const bodyStyles = {
    minHeight: '100vh',
    minWidth: '100%',
    padding: '1rem 2rem 0rem 2rem'
  };

  const navRow = {
      height: '3rem'
  }



  const habitRow = {
      height: '75vh'
  }

  const footerRow = {
      height: '2rem',
      marginBottom: "1rem"
  }



  return (
    <div className="App">
        <div height={10}>
          <div style={bodyStyles} className="ui grid container">
            <div  style={navRow} className="row top-menu">
              <div className="column">
                <NavBar />
              </div>
            </div>
            <div style={habitRow} className="row stretched">
              <div className="six wide column">
                <CalendarContainer />
              </div>
              <div className="ten wide column">
                <HabitSection />
              </div>
            </div>
                <Footer style={footerRow} className="row"/>
          </div>
        </div>
    </div>
  );
}

export default App;
