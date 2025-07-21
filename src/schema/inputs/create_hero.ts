// src/inputs/HeroInput.ts
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class HeroInput {
  @Field()
  name: string;

  @Field()
  url: string;

  @Field(() => Int)
  win_rate: number;

  @Field(() => Int)
  total_talishar_plays: number;

  @Field(() => Int)
  id_time_period: number;
}
