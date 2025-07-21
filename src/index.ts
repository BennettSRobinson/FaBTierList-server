import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data_source";
import { HeroResolver } from "./schema/resolvers/hero_resolver";
import 'dotenv/config';

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [HeroResolver],
  });

  const server = new ApolloServer({ schema });
  await server.start();

  const app = express();
  server.applyMiddleware({ app });

  app.listen(4000, () => {
    console.log("Server started on http://localhost:4000/graphql");
  });
}

bootstrap().catch((error) => console.error(error));
