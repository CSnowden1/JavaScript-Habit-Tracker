import { useState, useEffect } from "react";
import Subheading from "../reusableComponents/subHeading";
import CustomButton from "../reusableComponents/submitBtn";
import HabitForm from "./addHabitModel";
import HabitContainer from "../habitTackerComponents/habitContainer";
import SearchBar from "../reusableComponents/search";
import { useAuth } from "../../Context/authContext";
import mock from "../../exmapleHabit/mock.json"


function HabitSection({ onHabitsChange, theme }) {
  const [open, setOpen] = useState(false);
  const [habits, setHabits] = useState([]);
  //const storedHabits = JSON.parse(localStorage.getItem('habits')) || [];
  const [editingHabit, setEditingHabit] = useState(null);
  const [editingHabitData, setEditingHabitData] = useState(null);

    const { user } = useAuth();
    const userId = user ? user.user._id : null;


  useEffect(() => {
    console.log("CalendarSection mounted.");
  }, []);






  useEffect(() => {
        if (user) {
          const habitsData = user.user.habits;
          console.log(habitsData)
          setHabits(habitsData);
          onHabitsChange();
        } else {
          setHabits(mock);
        }
    }, [user]
  );



  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);

  };


  const handleSave = async () => {
    const updatedHabits = await fetchHabitsFromServer(userId);
    setHabits(updatedHabits);
    onHabitsChange();
  };
  
  const handleEdit = async (userId, habitId) => {
    console.log("HAndle Edit Btn")
    try {
      console.log(`http://localhost:5000/users/${userId}/habits/${habitId}`)
      const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const editingData = await response.json();
        console.log(editingData);
        setEditingHabitData(editingData);
        handleOpen();
      } else {
        console.error("Failed to fetch habit data.");
      }
    } catch (error) {
      console.error("Error fetching habit data:", error);
    }
  };




  const handleDelete = async (userId, habitId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this habit?");
    
    if (confirmDelete) {
      try {
        // Send a DELETE request to delete the habit on the server
        const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
        
        );
  
        if (!response.ok) {
          throw new Error(`Failed to delete habit: ${response.statusText}`);
        }
  
        const updatedHabits = await fetchHabitsFromServer(userId);
        setHabits(updatedHabits);

        
      } catch (error) {
        console.error("Error deleting habit:", error);
        window.alert("Failed to delete habit. Please try again.");
      }
    }
  };


  const handleAdd = async (userId, habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}/increment`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        const updatedHabits = await fetchHabitsFromServer(userId);

        setHabits(updatedHabits);
        onHabitsChange();
      } else {
        console.error("Failed to update habit on the server");
      }
    } catch (error) {
      console.error(error);
    }
  };


  async function fetchHabitsFromServer(userId) {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      if (response.ok) {
        const habits = await response.json();
        console.log(habits);
        const habitData = habits.user.habits
        return habitData;
      } else {
        console.error("Failed to fetch habits from the server");
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  

  const handleMinus = async (userId, habitId) => {
    try {
      const response = await fetch(`http://localhost:5000/users/${userId}/habits/${habitId}/decrement`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({}),
      });
  
      if (response.ok) {
        // Fetch updated habits from the server
        const updatedHabits = await fetchHabitsFromServer(userId);
        setHabits(updatedHabits);
        onHabitsChange();
      } else {
        console.error("Failed to update habit on the server");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const containersStyles = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: "center",
    height: "auto",
    width: "100%"
    };
  
  
  
  const buttonStyles = {
    borderRadius: '.5rem',
    backgroundColor: theme !== 'light' ? '#431D56' : 'rgba(49, 21, 219, 0.72)',
    border:"none",
    color: theme !== 'light' ? 'white' : 'white',
    width: '50%',
    height: '3rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '1rem',
    justifySelf: 'center',
    alignSelf: "center",
  };
  


  return (
    <>
      <div style={containersStyles} className="column">
        <Subheading theme={theme} title="Habits" />
        <SearchBar theme={theme} />
        <HabitContainer theme={theme} habits={habits} deleteFunction={handleDelete} editFunction={handleEdit} Add={handleAdd} Minus={handleMinus} />
        <HabitForm
        theme={theme}
          open={open}
          onSave={handleSave}
          onClose={editingHabit ? handleCancelEdit : handleClose}
          onEdit={handleEdit}
          habit={editingHabitData}
        />
        <button style={buttonStyles} onClick={handleOpen}>Create New Habit</button>
      </div>
    </>
  );



  
}





export default HabitSection;