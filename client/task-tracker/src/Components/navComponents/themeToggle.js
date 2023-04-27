import { Button, Icon } from 'semantic-ui-react';

function ThemeToggle({theme, handleToggleDarkMode}) {

 


  const toggleStyle = {
    flex: '1',

  }

  return (
    <>
      <div style={toggleStyle}>
        <Button icon labelPosition='left' onClick={handleToggleDarkMode}>
          <Icon name={theme ? 'sun' : 'moon'} />
          {theme ? 'Light Mode' : 'Dark Mode'}
        </Button>
      </div>
    </>

  );
}

export default ThemeToggle;







