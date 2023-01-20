// @desc Get Habits
// @route GET /api/goals
// @access Private

const getHabits = (req, res) => {
    res.status(200).json({ message: "We Got Habits"});
};

// @desc SET Habit
// @route POST /api/goals
// @access Private

const setHabit = (req, res) => {
    if(!req.body.text) {
        res.status(400).json({message: 'Please add a text field'});
    }

    res.status(200).json({ message: "Habit Created"});
};

// @desc Update Habit
// @route PUT /api/goals
// @access Private

const updateHabit = (req, res) => {
    res.status(200).json({ message: `Habit Updated ${req.params.id}`});
};

// @desc Delete Habit
// @route DELETE /api/goals
// @access Private

const deleteHabit = (req, res) => {
    res.status(200).json({ message: `Habit Deleted ${req.params.id}`});
};






module.exports = {
    getHabits, setHabit, updateHabit, deleteHabit
}