import path from 'path';
import { ApolloServer } from 'apollo-server-express';
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas';

const typesArray = fileLoader(path.join(__dirname, './types'));
const resolversArray = fileLoader(path.join(__dirname, './resolvers'));

const SERVER = new ApolloServer({
  typeDefs: mergeTypes(typesArray, { all: true }),
  resolvers: mergeResolvers(resolversArray),
  introspection: true,
  // subscriptions: true,
  playground: {
    endpoint: `/graphql`,
    settings: {
      'editor.theme': 'light'
    }
  }
  // context: ({ req }) => {
  //   return {
  //     config
  //   };
  // }
});

export default SERVER;
