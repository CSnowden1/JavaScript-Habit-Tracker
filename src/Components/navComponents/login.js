import React from 'react';
import { Button } from 'semantic-ui-react';
import { useAuth } from '../../Context/authContext'; // Replace this with your actual authentication context

function NavigationBar({ open }) {
  const { user, logout } = useAuth();

  const handleButtonClick = () => {
    if (user) {
      // If user is logged in, handle logout
      logout(); // You need to implement a logout function in your authentication context
    } else {
      // If user is not logged in, open the login modal
      open();
    }
  };

  return (
    <div>
      <Button onClick={handleButtonClick}>
        {user ? 'Log out' : 'Log in'}
      </Button>
    </div>
  );
}

export default NavigationBar;
