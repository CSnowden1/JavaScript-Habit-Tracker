import ThemeToggle from "./themeToggle";
import NavigationBar from "./login";
import InboxButton from "./inbox";
import SettingsButton from "./settings";



function navBar({theme, handleToggleDarkMode}) {

    const navBoxStyles = {
        height: '7rem'
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
            <div style={navBoxStyles} class="row grid">
                <div style={navStyles}>
                    <ThemeToggle  theme={theme} handleToggleDarkMode={handleToggleDarkMode} />
                    <NavigationBar />
                    <InboxButton/>
                    <SettingsButton/>
                </div>
            </div>
        </>
    );
}


export default navBar