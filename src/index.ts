import { ApolloServer } from "apollo-server-express";
import express from "express";
import { buildSchema } from "type-graphql";
import { AppDataSource } from "./data_source";
import { HeroResolver } from "./schema/resolvers/hero_resolver";
import { TimePeriodResolver } from "./schema/resolvers/time_period_resolver";
import cors from 'cors';
import 'dotenv/config';

async function bootstrap() {
  await AppDataSource.initialize();

  const schema = await buildSchema({
    resolvers: [HeroResolver, TimePeriodResolver],
  });

  const server = new ApolloServer({ 
    schema,   
  });
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
