import { Image, Header, Segment, Grid, Divider } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';


function Habit() {
  const flexContainerStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '7rem',
    width: '100%',
    border: "1px solid rgba(0, 0, 0, 0.08)",
    background: "white"
  };

  const imageStyles = {
    height: '5rem',
    width: '5rem',
    margin: '0.5rem',
    border: 'solid black'
  };

  const headerStyles = {
    margin: '0.5rem'
  };

  return (
    <div style={flexContainerStyles}>
      <Image src='your-image-url' style={imageStyles} />
      <Header as='h2' style={headerStyles}>
        Your Title
      </Header>
      <Divider vertical />
      <CircularProgressbar />
    </div>
  );
}

export default Habit;