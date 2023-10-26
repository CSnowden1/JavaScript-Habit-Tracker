import { Button, Icon } from 'semantic-ui-react';

function SettingsButton() {



  const buttonStyle = {
    background: 'white',
    color: 'black',
    border: '1px solid black',
  };


    return (
      <Button  style={buttonStyle} icon>
        <Icon name='settings' />
      </Button>
    );
  }


export default SettingsButton;