// src/entity/Hero.ts
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Hero_Image } from "./hero_image";
import { Time_Period } from "./time_period";

@ObjectType()
@Entity()
export class Hero {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Int)
  @Column()
  win_rate: number;

  @Field(() => Int)
  @Column()
  total_talishar_plays: number;

  @Field(() => Hero_Image)
  @ManyToOne(() => Hero_Image, heroImage => heroImage.heroes, { eager: true })
  @JoinColumn({ name: "id_hero_image" })
  hero_details: Hero_Image;

  @Field(() => Time_Period)
  @ManyToOne(() => Time_Period, timePeriod => timePeriod.heroes, { eager: true })
  @JoinColumn({ name: "id_time_period" })
  time_period: Time_Period;
}
