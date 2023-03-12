import { useState, useEffect } from 'react';
import CustomContainer from '../reusableComponents/container';
import HabitBar from './habit';

function HabitContainer({ handleSave }) {
  const [habits, setHabits] = useState([]);

  useEffect(() => {
    const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
    setHabits(storedHabits);
  }, []);

  const [shouldUpdate, setShouldUpdate] = useState(false);

  useEffect(() => {
    window.addEventListener('storage', () => {
      const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
      setHabits(storedHabits);
      setShouldUpdate(true);
    });
  }, []);

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

  const handleDelete = (id) => {
    const listItems = habits.filter((item) => item.id !== id);
    setHabits(listItems);
    localStorage.setItem('habits', JSON.stringify(listItems));
    setShouldUpdate(true);
  };

  return (
    <>
      {habits.length ? (
        <CustomContainer onChange={(e) => handleSave(habits)}>
          {habits.map((habit) => (
            <HabitBar style={divStyles} key={habit.id} habit={habit} handleDelete={handleDelete} />
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