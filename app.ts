import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import http from "http";
import cors from "cors";
import express from "express";
import { startStandaloneServer } from "@apollo/server/standalone";
import typeDefs from "./graphql/typeDef";
import resolvers from "./graphql/resolvers";
import connectToDatabase from "./config/db";
import knexDB from "./config/db";

const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

const startServer = async () => {
  await connectToDatabase.connectToDatabase();
  await server.start();

  app.use(
    "/graphql",
    cors<cors.CorsRequest>({
      origin: true,
    }),
    express.json(),
    expressMiddleware(server)
  );

  httpServer.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql/`);
  });

  // await new Promise<void>((resolve) =>
  //   httpServer.listen({ port: 4000 }, resolve)
  // );
  // console.log(`🚀 Server ready at http://localhost:4000/graphql/`);

  // const { url } = await startStandaloneServer(server, {
  //   listen: { port: 4000 },
  // });

  // console.log("Server listening at", url);
};

startServer();

// await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
// console.log(`🚀 Server ready at http://localhost:4000/graphql`);
