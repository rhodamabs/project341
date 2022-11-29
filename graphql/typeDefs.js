const {gql} = require('apollo-server-express');
const typeDefs = gql`
  type Query {
    course(ID:ID!): Course!
    getCourses(amount:Int): [Course]
  }
  type Course {
    code: String
    name: String
    semester:String
    year: Date
    status: String
    }
    input CourseInput {
    code: String
    name: String
    semester:String
    year: Date
    status: String
    }
    type Mutation {
      createCourse(courseInput:CourseInput): Course!
      deleteCourse(ID:ID!): Boolean
      editCourse(ID:ID!,courseInput:CourseInput): Boolean

    }
  
`;
module.exports.typeDefs;