import { Image, Header, Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed}) {

  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    backgroundColor: habit.count === habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count === habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count === habit.goal ? '0.5s' : 'none',
    marginBottom: '.5rem'
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
    justifyContent: 'space-between',
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
          <Button icon="plus" onClick={() => Add(habit.id) } />
          <Button icon="minus" onClick={() => Minus(habit.id)} />
        </div>
        <div style={middleStyles}>
          <Image src={habit.image}/>
          <Header as='h2'>{habit.name}</Header>
          <CircularProgressbar habit={habit} />
          <Header as='h2'>{habit.frequency}</Header>
        </div>
        <div style={rightStyles}>
          <Button icon="edit" onClick={() => editFunction(habit.id)} />
          <Button icon="delete" onClick={() => deleteFunction(habit.id)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;