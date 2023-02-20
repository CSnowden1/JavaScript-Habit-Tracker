import { useState } from 'react';
import CustomContainer from '../reusableComponents/container';
import Habit from '../habitTackerComponents/habit';

function HabitContainer() {
  const [habits, setHabits] = useState(JSON.parse(localStorage.getItem('habits')) || []);

  function handleDelete(habitId) {
    const updatedHabits = habits.filter((habit) => habit.id !== habitId);
    console.log('Old habits:', habits);
    console.log('Updated habits:', updatedHabits);
    setHabits(updatedHabits);
  }

  const habitComponents = habits.map((habit) => (
    <Habit key={habit.id} habit={habit} onDelete={() => handleDelete(habit.id)} />
  ));
  
  return (
    <CustomContainer title={habitComponents} />
  );
}

export default HabitContainer;