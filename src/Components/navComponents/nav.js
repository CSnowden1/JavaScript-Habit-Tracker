import ThemeToggle from "./themeToggle";
import NavigationBar from "./login";
import InboxButton from "./inbox";
import SettingsButton from "./settings";
import { useState } from 'react';
import LoginOverlay from "../loginSignUpComponents/loginOverlay";


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
        justifyContent: "space-between",
        alignItems: 'center',
        gap: '1rem'
    }

    return (
        <>
            <div style={navBoxStyles}>
                <div style={navStyles}>
                    <ThemeToggle  theme={theme} handleToggleDarkMode={handleToggleDarkMode} />
                    <NavigationBar open={handleOpen} />
                    <InboxButton/>
                    <SettingsButton/>
                    <LoginOverlay open={open} close={handleClose}/>
                </div>
            </div>
        </>
    );
}


export default navBar