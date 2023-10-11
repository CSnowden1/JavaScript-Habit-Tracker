import { Button } from 'semantic-ui-react';

function NavigationBar({open}) {

    return (
      <div>
            <Button onClick={open}>Log in</Button>
      </div>
    );
  }

export default NavigationBar;