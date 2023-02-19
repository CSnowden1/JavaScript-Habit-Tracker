import CustomContainer from "../reusableComponents/container";
import Habit from "../habitTackerComponents/habit";

function HabitContainer() {
  return (
    <>
        <CustomContainer title={<Habit/>}  />
    </>
  )
}


export default HabitContainer;


