const Course = (mongoose) => {
    const courseSchema = mongoose.Schema({
        code: {
            type:String,
            required: true, 
        },
        name: {
            type:String, 
            required: true,    
        },
        semester: {
            type:String,
            required: true,       
        },
        year: {
            type:Date,
            required: true,    
        },
        status:{
            type:String,
            required: true,    
        }
});
return mongoose.model('Course', courseSchema);
};
module.exports = Course;