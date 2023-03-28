import { Image, Header, Button } from 'semantic-ui-react';
import CircularProgressbar from '../habitTackerComponents/progressCircle';

function HabitBar({ habit, deleteFunction, editFunction, Add, Minus, completed}) {

  const flexRow = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 'auto',
    backgroundColor: habit.count >= habit.goal ? 'gold' : 'transparent',
    transition: 'background-color 0.5s ease-in-out',
    animation: habit.count >= habit.goal ? 'flash 1s 5s' : 'none',
    animationDelay: habit.count >= habit.goal ? '0.5s' : 'none',
    marginBottom: '.5rem',
    borderBottom: 'solid white 5px'
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

  const mediaQueryStyles = {
    '@media screen and (max-width: 768px)': {
      flexRow: {
        flexDirection: 'column',
      },
      leftStyles: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly'
      },
      middleStyles: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '1rem'
      },
      rightStyles: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        marginTop: '1rem'
      }
    }
  };

  return (
    <>
      <div key={habit.id} habit={habit} style={{ ...flexRow, ...mediaQueryStyles.flexRow }}>
        <div style={{ ...leftStyles, ...mediaQueryStyles.leftStyles }}>
          <Button icon="plus" onClick={() => Add(habit.id) } />
          <Button icon="minus" onClick={() => Minus(habit.id)} />
        </div>
        <div style={{ ...middleStyles, ...mediaQueryStyles.middleStyles }}>
          <Image src={habit.image}/>
          <Header as='h2'>{habit.name}</Header>
          <CircularProgressbar habit={habit} />
        </div>
        <div style={{ ...rightStyles, ...mediaQueryStyles.rightStyles }}>
          <Button icon="edit" onClick={() => editFunction(habit.id)} />
          <Button icon="delete" onClick={() => deleteFunction(habit.id)}/>
        </div>
      </div>
    </>
  );
}

export default HabitBar;