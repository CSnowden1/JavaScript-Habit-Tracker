import NavBar from "../navComponents/nav"
import HabitSection from "../habitTackerComponents/habitSection";
import Calendarcontainer from "../calendarComponents/container";
import Footer from "./footer"

function Body() {


    const bodyStyles = {
        minHeight: '100vh',
        minWidth: '100%',
        padding: '1rem 2rem 0rem 2rem',
        border: "solid orange"
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
              <Calendarcontainer />
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