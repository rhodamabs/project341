const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const certificateSchema = new Schema({
  
        name: {
            type:String,
            required: true
        },
        status:{
            type:String,
            required: true
         },
         year: {
            type:String,
            required: true
         }
});

const Certificate = mongoose.model('certificate',certificateSchema);
module.exports = Certificate;