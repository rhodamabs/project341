const Course = (mongoose) => {
    const courseSchema = mongoose.Schema({
    code: {
        type:String,

    },
        name: {
            type:String,
           
        },
        semester: {
            type:String,
          
        },
    year: {
        type:String,
        
    },
        status:{
            type:String,
            
        }
});
return mongoose.model('courses', courseSchema);
};
module.exports = Course;