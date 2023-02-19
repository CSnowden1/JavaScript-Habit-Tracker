import { useState, useEffect } from "react";
import { Button, Modal, Form, Select } from "semantic-ui-react";

const HabitForm = ({ open, onClose, onSave}) => {
    console.log("HabitForm open prop is:", open);


    const [habits, setHabits] = useState(() => {
        const storedHabits = JSON.parse(localStorage.getItem("habits"));
        return storedHabits || [];
      });

      useEffect(() => {
        localStorage.setItem("habits", JSON.stringify(habits));
      }, [habits]);



    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [frequency, setFrequency] = useState("");
    const [time, setTime] = useState("");
    const [goal, setGoal] = useState("");

    const handleSave = () => {
        console.log("Habit Saved");
        const habitToUpdate = habits.find((h) => h.name === name);
        if (habitToUpdate) {
        habitToUpdate.image = image;
        habitToUpdate.frequency = frequency;
        habitToUpdate.time = time;
        habitToUpdate.goal = goal;
        } else {
        setHabits([...habits, { name, image, frequency, time, goal }]);
        }
        onClose();
    };

    const options = [
        { key: "daily", value: "daily", text: "Daily" },
        { key: "weekly", value: "weekly", text: "Weekly" },
        { key: "monthly", value: "monthly", text: "Monthly" },
        { key: "yearly", value: "yearly", text: "Yearly" },
    ];

    return (
        <Modal open={open} onClose={onClose}>
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
                <label>Upload an Image</label>
                <input type="file" accept="image/*" onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))} />
                {image && <img src={image} alt="habit" />}
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