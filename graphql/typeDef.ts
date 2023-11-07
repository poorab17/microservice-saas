//graphql/typeDef

const typeDefs = `

type Competition {
  id: ID!
  category: String!
  name: String!
  code: String!
  place: String!
  fromDate: String!
  toDate: String!
  conductedBy: String!
  createdAt:String
}

 input CompetitionInput {
    category: String!
    name: String!
    code: String!
    place: String!
    fromDate: String!
    toDate: String!
    conductedBy: String!
  }

type Mutation {
    createCompetition(data: CompetitionInput): Competition
    updateCompetition(id: ID!, data: CompetitionInput): Competition
    deleteCompetition(id: ID!): Competition
  }

  type Query {
    hello: String
    getCompetitions: [Competition] 
  }
`;

export default typeDefs;

// type Mutation {
//   createCompetition(
//     category: String!
//     name: String!
//     code: String!
//     place: String!
//     fromDate: String!
//     toDate: String!
//     conductedBy: String!
//   ): Competition
// }
