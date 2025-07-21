// src/entity/Hero_Image.ts
import { ObjectType, Field, ID } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Hero } from "./hero";

@ObjectType()
@Entity()
export class Hero_Image {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  url: string;

  @Field()
  @Column()
  name: string;

  // One Hero_Image can have many Heroes
  @OneToMany(() => Hero, hero => hero.hero_details)
  heroes: Hero[];
}
