import { useState, } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";
import { v4 as uuidv4 } from 'uuid';




const HabitForm = ({ open, onClose, onSave}) => {
    console.log("HabitForm open prop is:", open);


    if (!localStorage.getItem("habits")) {
        localStorage.setItem("habits", JSON.stringify([]));
      }



    const [habits, setHabits] = useState(() => {
        const storedHabits = localStorage.getItem("habits");
        return storedHabits ? JSON.parse(storedHabits) : [];
      });

    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [time, setTime] = useState("");
    const [goal, setGoal] = useState("");

    const handleSave = () => {
        console.log("Habit Saved");
        const newHabit = { id: uuidv4(), name, image, frequency, time, goal };
        setHabits([...habits, newHabit]);
        onSave(newHabit);
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
        { key: "heart", value: "heart", text: "Heart", icon: "heart" },
        { key: "star", value: "star", text: "Star", icon: "star" },
        { key: "smile", value: "smile", text: "Smile", icon: "smile" },
        { key: "thumbs up", value: "thumbs up", text: "Thumbs Up", icon: "thumbs up" },
        { key: "flag", value: "flag", text: "Flag", icon: "flag" },
        { key: "shopping bag", value: "shopping bag", text: "Shopping Bag", icon: "shopping bag" },
        { key: "sun", value: "sun", text: "Sun", icon: "sun" },
        { key: "moon", value: "moon", text: "Moon", icon: "moon" },
        { key: "lightning", value: "lightning", text: "Lightning", icon: "lightning" },
        { key: "cloud", value: "cloud", text: "Cloud", icon: "cloud" },
    ];


    return (
        <Modal open={open} onClose={onClose} onSave={addHabit}>
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
                <input type="text" placeholder="Goal" value={goal} onChange={(e) => setGoal(e.target.value)}/>
            </Form.Field>
            <Form.Field>
                <label>Choose an Image</label>
                <Select
                    placeholder="Select an Image"
                    options={imgOptions}
                    value={image}
                    onChange={(e, { value }) => setImage(value)}
                />
                {image && <img src={`https://semantic-ui.com/images/icon/${image}.png`} alt="habit" />}
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