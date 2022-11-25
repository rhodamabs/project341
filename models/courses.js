const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    code: {
        type:String,
        required: true
    },
        name: {
            type:String,
            required: true
        },
        semester: {
            type:String,
            required: true
        },
    year: {
        type:String,
        required: true
    },
        status:{
            type:String,
            required: true
        }
})

const Course = mongoose.model('course',courseSchema);
module.exports = Course;