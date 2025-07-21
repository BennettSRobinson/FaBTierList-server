import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hero } from "./schema/entities/hero";
import { Hero_Image } from "./schema/entities/hero_image";
import { Time_Period } from "./schema/entities/time_period";
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: "mysql", // or your db type
  host: process.env.DATABASE_HOST,
  port: 3306,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_USER,
  entities: [Hero, Hero_Image, Time_Period],
  synchronize: true, // only for dev, be careful in prod
  logging: false,
});
