import React from 'react';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../../Context/authContext';


function NavigationBar({ open, theme }) {
  const { user, logout } = useAuth();

  const handleButtonClick = () => {
    if (user) {
      logout();
    } else {
      open();
    }
  };


  const buttonStyle = {
    border: theme !== 'light' ? '1px solid white' : '1px solid black',
    color: theme !== 'light' ? 'white' : 'black',
    backgroundColor: theme !== 'light' ? 'black' : 'white',
  };

  return (
    <div>
      <Button style={buttonStyle} onClick={handleButtonClick}>
        {user ? 'Log out' : 'Log in'}
      </Button>
    </div>
  );
}

export default NavigationBar;
