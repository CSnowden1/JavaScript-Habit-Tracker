import React from 'react';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../../Context/authContext';


function NavigationBar({ open }) {
  const { user, logout } = useAuth();

  const handleButtonClick = () => {
    if (user) {
      logout();
    } else {
      open();
    }
  };


  const buttonStyle = {
    background: 'white',
    color: 'black',
    border: '1px solid black',
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
