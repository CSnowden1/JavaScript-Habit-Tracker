const asyncHandler = require('express-async-handler');

// @desc Get Habits
// @route GET /api/goals
// @access Private

const { async } = require("jshint/src/prod-params");

const getHabits = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "We Got Habits"});
});

// @desc SET Habit
// @route POST /api/goals
// @access Private

const setHabit =  asyncHandler(async  (req, res) => {
    if(!req.body.text) {
        res.status(400)
        throw new Error("Please Add A Text Field")
}

    res.status(200).json({ message: "Habit Created"});
});

// @desc Update Habit
// @route PUT /api/goals
// @access Private

const updateHabit =   asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Habit Updated ${req.params.id}`});
});

// @desc Delete Habit
// @route DELETE /api/goals
// @access Private

const deleteHabit =  asyncHandler(async (req, res) => {
    res.status(200).json({ message: `Habit Deleted ${req.params.id}`});
});






module.exports = {
    getHabits, setHabit, updateHabit, deleteHabit
}