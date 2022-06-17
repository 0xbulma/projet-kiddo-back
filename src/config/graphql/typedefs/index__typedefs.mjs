import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type Query {
    _id: String
  }
`;

export default typeDefs;
