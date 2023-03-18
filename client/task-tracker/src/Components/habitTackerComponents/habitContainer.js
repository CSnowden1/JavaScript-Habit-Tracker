import CustomContainer from '../reusableComponents/container';
import HabitBar from './habit';

function HabitContainer({ habits, handleSave, deleteFunction, editFunction, Add, Minus }) {

  const divStyles = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid black 1px',
    color: 'black',
  };

  const noHabit = {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black',
    fontWeight: '700',
    fontSize: '1.25rem',
    marginTop: '1rem',
  };

  return (
    <>
      {habits.length ? (
        <CustomContainer onChange={(e) => handleSave(habits)}>
          {habits.map((habit) => (
            <HabitBar style={divStyles} key={habit.id} habit={habit} deleteFunction={deleteFunction} editFunction={editFunction} Add={Add} Minus={Minus} />
          ))}
        </CustomContainer>
      ) : (
        <CustomContainer>
          <div style={noHabit}>Add a Habit to Track</div>
        </CustomContainer>
      )}
    </>
  );
}

export default HabitContainer;