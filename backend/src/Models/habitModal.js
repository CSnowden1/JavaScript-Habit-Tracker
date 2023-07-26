const mongoose = require('mongoose');

const habitSchema = mongoose.Schema({
    text: {
        types: String,
        required: [true, 'Please add a text value'],

    },
},
{
    timestamps: true,
}

)


module.exports = mongoose.model('Habit', habitSchema);