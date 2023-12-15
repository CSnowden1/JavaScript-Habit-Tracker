import ThemeToggle from "./themeToggle";
import NavigationBar from "./login";
import { useState } from 'react';
import LoginOverlay from "../loginSignUpComponents/loginOverlay";
import "./btn.css"

function navBar({theme, handleToggleDarkMode}) {
    const [open, setOpen] = useState(false);


    const handleOpen = () => {
        setOpen(true);
        console.log("Login Clicked")
      };



      const handleClose = () => {
        setOpen(false);
        console.log("Outside Clicked")
      };


    const navBoxStyles = {
        height: '7rem',
        width: "100%",
        margin: '1rem',
        marginBottom: '0rem',
        marginRight: "1rem",
        padding: '1rem',
        paddingBottom: '0rem'
    };

    const navStyles = {
        width: '100%',
        display: 'flex',
        justifyContent: "space-around",
        alignItems: 'center',
        gap: '1rem'
    }

    return (
        <>
            <div class="nav-nav" style={navBoxStyles}>
                <div class="nav-media" style={navStyles}>
                    <ThemeToggle  theme={theme} handleToggleDarkMode={handleToggleDarkMode} />
                    <NavigationBar theme={theme} open={handleOpen} />
                    <LoginOverlay open={open} close={handleClose}/>
                </div>
            </div>
        </>
    );
}


export default navBar