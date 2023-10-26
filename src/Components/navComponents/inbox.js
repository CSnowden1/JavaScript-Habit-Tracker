import { Button, Icon } from 'semantic-ui-react';





function InboxButton({theme}) {


  const buttonStyle = {
    background: 'white',
    color: 'black',
    border: theme !== 'light' ? '1px solid white' : '1px solid black',
    color: theme !== 'light' ? 'white' : 'black',
    backgroundColor: theme !== 'light' ? 'black' : 'white',
  };


    return (
      <Button style={buttonStyle} icon class="ui inverted yellow button">
        <Icon name='inbox' />
      </Button>
    );
  }

export default InboxButton;