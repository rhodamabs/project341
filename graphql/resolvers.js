const Course = require('../models/courses');
const resolvers = {
    Query : {
      async course(_,{ID}){
        return await Course.findById(ID)
      },
      async getCourse(_, {amount}){
        return await Course.find().sort()
      }
    },
    Mutation: {
      async createCourse(_,{courseInput: {code,name,semester,  year,
        status}}){
          const createdCourse = new Course({
            code: code,
            name : name,
            semester : semester,
            year : year,
            status : status,
          });
          const res = await createdCourse.save();
          return {
            id: res.id,
            ...res._doc
          }
        },
        async deleteCourse(_,{ID}){
          const wasDeleted = (await Course.deleteOne({_id :ID})).deleteCount;
          return wasDeleted;
        },
        async editCourse(_,{ID,courseInput: {code,name, semester, year,status}}) {
          const wasEdited = (await Course.updateOne({_id :ID}, {code:code,name:name,semester:semester, year:year, status:status})).modifiedCount;
          return wasEdited;
        }
    }
  };

module.exports = resolvers;