import * as Koa from "koa";
import * as morgan from "koa-morgan";
import { ApolloServer, gql } from "apollo-server-koa";
import { graphQLSchema } from "@blueheart/fsi-api-spec/lib/graphqlSchema";
import { Resolvers } from "@blueheart/fsi-api-spec/lib/generated/graphql";

import { DBApi } from "./db";

interface ServerDependencies {
  dbApi: DBApi;
}

export const createApp = (app: Koa, ServerDependencies) => {
  app.use(morgan("dev"));
  const apolloServer = createApollo(ServerDependencies);
  apolloServer.applyMiddleware({ app });
  return app;
};

export const createApollo = (serverDependencies: ServerDependencies) => {
  const resolvers: Resolvers<ServerDependencies> = {
    Query: {
      getPosts: (_, { skip = 0, take = -1 }, ctx) => {
        return ctx.dbApi.getPosts({ skip, take });
      },
    },
    Mutation: {
      createPost: (_, { post }, { dbApi }) => {
        return dbApi.createPost(post);
      },
    },
  };

  return new ApolloServer({
    typeDefs: gql(graphQLSchema),
    resolvers,
    playground: true,
    introspection: true,
    context: serverDependencies,
  });
};
