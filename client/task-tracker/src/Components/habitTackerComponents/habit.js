import { Image, Header, Divider, Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';

function HabitBar({ habit, handleDelete}) {
  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
  };

  const leftStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const middleStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  const rightStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };







  return (
    <>
      <div key={habit.id} habit={habit} style={flexRow}>
        <div style={leftStyles}>
          <Button icon="plus" />
          <Button icon="minus" />
        </div>
        <div style={middleStyles}>
          <Image src={habit.image} />
          <Header as='h2'>{habit.name}</Header>
          <Divider />
          <CircularProgressbar data={habit.progress} />
        </div>
        <div style={rightStyles}>
          <Button icon="edit" />
          <Button icon="delete" onClick={() => handleDelete(habit.id)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;