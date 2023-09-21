import { useState, } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";
import { v4 as uuidv4 } from 'uuid';
import Habit from "../../Models/habitModel";

function HabitO(name, image, frequency, time, goal = 0, count = 0) {
    this.id = uuidv4();
    this.name = name;
    this.image = image;
    this.frequency = frequency;
    this.time = time;
    this.goal = parseInt(goal);
    this.count = count;


}


const HabitForm = ({ open, onClose, onSave, habit, onEdit }) => {
    const [name, setName] = useState(habit ? habit.name : "");
    const [image, setImage] = useState(habit ? habit.image : "");
    const [frequency, setFrequency] = useState(habit ? habit.frequency : "");
    const [time, setTime] = useState(habit ? habit.time : "");
    const [goal, setGoal] = useState(habit ? habit.goal.toString() : "");


    console.log("HabitForm open prop is:", open);

    if (!localStorage.getItem("habits")) {
        localStorage.setItem("habits", JSON.stringify([]));
      }

    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem("habits");
        return storedHabits ? JSON.parse(storedHabits) : [];
      });


    const handleSave = async () => {

        const newHabit = new HabitO(name, image, frequency, time, goal);
        console.log("Habit Saved");

        try {
            const newHabit = new Habit(newHabitData);
            await newHabit.save();
            console.log("Habit saved to MongoDB");
          } catch (error) {
            console.error("Error saving habit to MongoDB:", error);
          }

        if (habit) {
            const updatedHabit = { ...habit, ...newHabit };
            onEdit(updatedHabit);
        } else {
            setHabits([...habits, newHabit]);
            onSave(newHabit);
        }

        onClose();
        const updatedHabits = JSON.parse(localStorage.getItem("habits")).concat(newHabit);
        localStorage.setItem("habits", JSON.stringify(updatedHabits));
    };



    const addHabit = (newHabit) => {
        setHabits([...habits, newHabit]);
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
        { key: "Video Game", value: "https://icons8.com/icon/YObj0fzpW3Re/game-controller", text: "Video Game"},
        { key: "Ball Point Pen", value: "    https://icons8.com/icon/FEmOY5BS5dPs/ball-point-pen", text: "Ball Point Pen"},
        { key: "Design", value: "https://icons8.com/icon/yEzFx4cwLDIh/design", text: "Design"},
        { key: "Paint Pallette", value: "https://icons8.com/icon/sO1mMMNJxeLB/paint-palette", text: "Paint Pallette"},
        { key: "Pencil", value: "https://icons8.com/icon/6rM43YNMgkta/pencil-drawing", text: "Pencil"},



    ];
    

    return (
        <Modal  open={open} onClose={onClose} onSave={addHabit} >
        <Modal.Header>Add a Habit</Modal.Header>
        <Modal.Content>
            <Form>
            <Form.Field>
                <label>Habit Name</label>
                <input
                type="text"
                placeholder="Habit Name"
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
                <label>Select Time</label>
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
                <input type="number" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)} />
            </Form.Field>
            <Form.Field>
                <label>Choose an Image</label>
                <Select
                    placeholder="Select an Image"
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