import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data_source";
import { HeroResolver } from "./schema/resolvers/hero_resolver";
import { TimePeriodResolver } from "./schema/resolvers/time_period_resolver";
import { InMemoryLRUCache } from "@apollo/utils.keyvaluecache";
import cors from 'cors';
import 'dotenv/config';

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [HeroResolver, TimePeriodResolver],
  });

  const server = new ApolloServer({ 
    schema,   
    cache: new InMemoryLRUCache({
      maxSize: Math.pow(2, 20) * 50, // limit to 50 MB
      ttl: 300000, // optional: 5 minutes in ms
    }),
    persistedQueries: {
      cache: new InMemoryLRUCache({
        maxSize: Math.pow(2, 20) * 50, // same size limit
        ttl: 300000, // optional TTL
      }),
  }});
  await server.start();

  const app = express();
  app.use(cors())
  server.applyMiddleware({ app });

  const PORT = process.env.PORT || 4000
  app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}/graphql`);
  });
}

bootstrap().catch((error) => console.error(error));
