import { Button, Icon } from 'semantic-ui-react';

function SettingsButton({theme}) {



  const buttonStyle = {
    border: theme !== 'light' ? '1px solid white' : '1px solid black',
    color: theme !== 'light' ? 'white' : 'black',
    backgroundColor: theme !== 'light' ? 'black' : 'white',
  };


    return (
      <Button  style={buttonStyle} icon>
        <Icon name='settings' />
      </Button>
    );
  }


export default SettingsButton;