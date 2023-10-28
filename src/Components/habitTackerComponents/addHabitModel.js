import React, { useState, useEffect } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";
import { useAuth } from "../../Context/authContext";







function HabitO(name, image, frequency, time, goal = 0, count = 0) {
    this.name = name;
    this.image = image;
    this.frequency = frequency;
    this.time = time;
    this.goal = parseInt(goal);
    this.count = parseInt(count);


}


const HabitForm = ({ open, onClose, habit, onEdit, theme }) => {

    const { user } = useAuth();
    const userId = user ? user.user._id : null;



    const [name, setName] = useState(habit ? habit.name : ""); 
    const [image, setImage] = useState(habit ? habit.image : ""); 
    const [frequency, setFrequency] = useState(habit ? habit.frequency : ""); 
    const [time, setTime] = useState(habit ? habit.time : ""); 
    const [goal, setGoal] = useState(habit ? habit.goal : ""); 




    useEffect(() => {
      if (open) {
          if (onEdit) {
              console.log("Form in Edit Mode");
              console.log(habit);
          } else {
              console.log("Form in Habit Mode");
          }
      }
  }, [open, onEdit]);


    console.log("HabitForm open prop is:", open);

    const handleSave = async (e) => {
      e.preventDefault();
    
      // Create a new habit object
      const newHabit = new HabitO(name, image, frequency, time, goal);
    
      try {
        if (onEdit) {
          console.log("Form in Edit MOde")
          // Edit mode: Send a PATCH request to update the habit
          const response = await fetch(`http://localhost:5000/${userId}/habits/${habit._id}/edit`, {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newHabit),
          });
    
          if (response.ok) {
            // Update your local state and close the modal
            const updatedHabits = await fetchHabitsFromServer(userId);
            setHabits(updatedHabits);
            handleClose();
          } else {
            window.alert("Failed to edit the habit.");
          }
        } else {
          console.log("Create Habit Mode")
          const response = await fetch(`http://localhost:5000//users/${userId}/habits`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newHabit),
          });
    
          if (response.status === 201) {
            // The habit was successfully created on the server
    
            // Update your local state and close the modal
            const updatedHabits = await fetchHabitsFromServer(userId);
            setHabits(updatedHabits);
            onClose();
          } else {
            // Handle an error response here
            console.error("Failed to create the habit on the server.");
          }
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };
    

   

    const options = [
        { key: "daily", value: "daily", text: "Daily" },
        { key: "weekly", value: "weekly", text: "Weekly" },
        { key: "monthly", value: "monthly", text: "Monthly" },
        { key: "yearly", value: "yearly", text: "Yearly" },
    ];


    const imgOptions = [
        { key: "Breakfast", value: "https://img.icons8.com/external-wanicon-flat-wanicon/1x/external-breakfast-hotel-wanicon-flat-wanicon.png", text: "Breakfast"},
        { key: "Snapchat", value: "https://img.icons8.com/3d-fluency/1x/snapchat-squared.png", text: "Snapchat"},
        { key: "Reddit", value: "https://img.icons8.com/external-wanicon-flat-wanicon/1x/external-breakfast-hotel-wanicon-flat-wanicon.png", text: "Reddit"},
        { key: "Instagram", value: "https://img.icons8.com/3d-fluency/1x/snapchat-squared.png", text: "Instagram"},
        { key: "Healthy Food", value: "https://img.icons8.com/3d-fluency/1x/avocado.png", text: "Healthy Food"},
        { key: "Unhealthy Food", value: "https://icons8.com/icon/9JK55mRzcjvG/french-fries", text: "Unhealthy Food"},
        { key: "Strength Training", value: "https://icons8.com/icon/bocBCRpgDfu8/dumbbell", text: "Strength Training"},
        { key: "Yoga Mat", value: "https://icons8.com/icon/k44QTJ9QjVOS/yoga-mat", text: "Yoga Mat"},
        { key: "Video Game", value: "https://img.icons8.com/?size=80&id=YObj0fzpW3Re&format=png", text: "Video Game"},
        { key: "Ball Point Pen", value: "https://img.icons8.com/?size=80&id=FEmOY5BS5dPs&format=png", text: "Ball Point Pen"},
        { key: "Design", value: "https://icons8.com/icon/yEzFx4cwLDIh/design", text: "Design"},
        { key: "Paint Pallette", value: "https://icons8.com/icon/sO1mMMNJxeLB/paint-palette", text: "Paint Pallette"},
        { key: "Pencil", value: "https://icons8.com/icon/6rM43YNMgkta/pencil-drawing", text: "Pencil"},



    ];
    

    const buttonStyle = {
      color: theme !== 'light' ? 'white' : 'black',
      backgroundColor: "black",
      //backgroundColor: theme !== 'light' ? 'black' : 'white',
    };

    return (
        <Modal style={buttonStyle} open={open} onClose={onClose}  >
        <Modal.Header>Add a Habit</Modal.Header>
        <Modal.Content>
            <Form>
            <Form.Field>
                <label>Habit Name</label>
                <input
                type="text"
                placeholder={habit ? habit.name : "Habit Name"}
                value={name}
                onChange={(e) => setName(e.target.value)}
                />
            </Form.Field>
            <Form.Field>
                <label>Do This Habit More Or Less</label>
                <div className="quant-btn">
                <Button id="more">More</Button>
                <Button id="less">Less</Button>
                </div>
            </Form.Field>
            <Form.Field>
                <label>How Frequently Will You Track This Habit?</label>
                <Select
                    name="time-select"
                    options={options}
                    value={frequency}
                    onChange={(e, { value }) => setFrequency(value)}
                />
            </Form.Field>
            <Form.Field>
                <label>When Do You Do This Habit</label>
                <Select
                    name="tda-select"
                    options={[
                    { key: "morning", value: "morning", text: "Morning" },
                    { key: "afternoon", value: "afternoon", text: "Afternoon" },
                    { key: "night", value: "night", text: "Night" },
                    ]}
                    value={time}
                    onChange={(e, { value }) => setTime(value)}
                />
            </Form.Field>
            <Form.Field>
                <label>What is your Goal?</label>
                <input type="number" placeholder={habit ? habit.goal : "Goal"} value={goal} onChange={(e) => setGoal(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Choose an Image</label>
                <Select
                    placeholder={habit ? habit.img : "Choose an image" }
                    options={imgOptions}
                    value={image}
                    onChange={(e, { value }) => setImage(value)}
                />
            </Form.Field>
            </Form>
        </Modal.Content>
        <Modal.Actions>
            <Button onClick={onClose}>Cancel</Button>
            <Button primary onClick={handleSave}>
                Save
            </Button>
        </Modal.Actions>
        </Modal>
    );
};

export default HabitForm