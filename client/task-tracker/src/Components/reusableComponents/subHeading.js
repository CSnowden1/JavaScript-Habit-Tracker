import { Header } from 'semantic-ui-react';


function Subheading(prop) {
    return (
      <Header as="h3" dividing>
        {prop.title}
      </Header>
    );
  }
export default Subheading;