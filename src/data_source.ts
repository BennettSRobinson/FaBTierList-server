import "reflect-metadata";
import { DataSource } from "typeorm";
import { Hero } from "./schema/entities/hero";
import { Hero_Image } from "./schema/entities/hero_image";
import { Time_Period } from "./schema/entities/time_period";

export const AppDataSource = new DataSource({
  type: "mysql", // or your db type
  host: "sql3.freesqldatabase.com",
  port: 3306,
  username: "sql3790407",
  password: "hmz5Agd5Gp",
  database: "sql3790407",
  entities: [Hero, Hero_Image, Time_Period],
  synchronize: true, // only for dev, be careful in prod
  logging: false,
});
