import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Hero } from "./hero";

@ObjectType()
export class Tier_Map {
  @Field(() => [Hero])
  S: Hero[]

  @Field(() => [Hero])
  A: Hero[]

  @Field(() => [Hero])
  B: Hero[]

  @Field(() => [Hero])
  C: Hero[]

  @Field(() => [Hero])
  D: Hero[]
}