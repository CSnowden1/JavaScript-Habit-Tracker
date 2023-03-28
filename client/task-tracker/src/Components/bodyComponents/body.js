import NavBar from "../navComponents/nav"
import HabitSection from "../habitTackerComponents/habitSection";
import Footer from "./footer"
import CalendarSection from "../calendarComponents/calanderSection"



function Body() {


    const bodyStyles = {
        minHeight: '100vh',
        minWidth: '100%',
        padding: '1rem 2rem 0rem 2rem',
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
        <div style={bodyStyles} className="ui grid container">
          <div  style={navRow} className="row top-menu">
            <div className="column">
              <NavBar />
            </div>
          </div>
          <div style={habitRow} className="row stretched">
            <div className="six wide column">
              <CalendarSection />
            </div>
            <div className="ten wide column">
              <HabitSection />
            </div>
          </div>
              <Footer style={footerRow} className="row"/>
        </div>
      );
    }


export default Body;