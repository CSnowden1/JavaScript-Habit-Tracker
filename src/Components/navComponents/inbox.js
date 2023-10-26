import { Button, Icon } from 'semantic-ui-react';





function InboxButton() {


  const buttonStyle = {
    background: 'white',
    color: 'black',
    border: '1px solid black',
  };


    return (
      <Button style={buttonStyle} icon class="ui inverted yellow button">
        <Icon name='inbox' />
      </Button>
    );
  }

export default InboxButton;