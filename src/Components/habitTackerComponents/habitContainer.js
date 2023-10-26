import CustomContainer from '../reusableComponents/container';
import HabitBar from './habit';

function HabitContainer({ habits, handleSave, deleteFunction, editFunction, Add, Minus, theme }) {

  const divStyles = {
    width: 'auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'solid black 1px',
    color: theme !== "light" ? "white" : "black"

  };

  const noHabit = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    fontSize: '1.25rem',
    marginTop: '1rem',
    color: theme !== "light" ? "white" : "black",
    width: '100%',
  };



  return (
    <>
      {habits.length ? (
        <CustomContainer theme={theme} onChange={(e) => handleSave(habits)}>
          {habits.map((habit) => (
            <HabitBar theme={theme}  style={divStyles} key={habit._id} habit={habit} deleteFunction={deleteFunction} editFunction={editFunction} habitId={habit._id} Add={Add} Minus={Minus} />
          ))}
        </CustomContainer>
      ) : (
        <CustomContainer theme={theme} >
          <div style={noHabit}>Add a Habit to Track</div>
        </CustomContainer>
      )}
    </>
  );
}

export default HabitContainer;