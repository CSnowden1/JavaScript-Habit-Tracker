import { Header } from 'semantic-ui-react';


function Subheading({ title, theme }) {

  const lightDark = {
    color: theme !== "light" ? "white" : "black"
  };



    return (
      <Header style={lightDark} as="h3" dividing>
        {title}
      </Header>
    );
  }
export default Subheading;