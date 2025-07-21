// src/entity/Time_Period.ts
import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Hero } from "./hero";

@ObjectType()
@Entity()
export class Time_Period {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  year: string;

  @Field()
  @Column()
  month: string;

  @OneToMany(() => Hero, hero => hero.time_period)
  heroes: Hero[];
}
