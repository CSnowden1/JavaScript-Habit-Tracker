import { Button, Icon } from 'semantic-ui-react';

function ThemeToggle({ theme, handleToggleDarkMode }) {

  const toggleStyle = {
    flex: '1',
    
  };

  const buttonStyle = {
    background: 'white',
    color: 'black',
    border: '1px solid black',
  };

  return (
    <>
      <div style={toggleStyle}>
        <Button style={buttonStyle} icon labelPosition='left' onClick={handleToggleDarkMode}>
          <Icon name={theme !== 'light' ? 'moon' : 'sun'} />
          {theme !== 'light' ? 'Dark Mode' : 'Light Mode'}
        </Button>
      </div>
    </>
  );
}

export default ThemeToggle;
