const Certificate = (mongoose) => {
    const certificateSchema = mongoose.Schema({ 
        name: {
            type:String,
        },
        status:{
            type:String,
         },
         year: {
            type:String,
         }
});
return mongoose.model('certificates',certificateSchema);
};

module.exports = Certificate;