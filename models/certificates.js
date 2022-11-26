const Certificate = (mongoose) => {
    const certificateSchema = mongoose.Schema({ 
        name: {
            type:String,
        },
        status:{
            type:String,
         },
         year: {
            type:Date,
         }
});
return mongoose.model('certificates',certificateSchema);
};

module.exports = Certificate;