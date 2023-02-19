import { useState, useEffect } from 'react';
import { Button, Icon } from 'semantic-ui-react';

function ThemeToggle() {

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };


  const toggleStyle = {
    flex: '1',

  }

  return (
    <>
      <div style={toggleStyle}>
        <Button icon labelPosition='left' onClick={toggleTheme}>
          <Icon name={isDarkMode ? 'sun' : 'moon'} />
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </>

  );
}

export default ThemeToggle;







