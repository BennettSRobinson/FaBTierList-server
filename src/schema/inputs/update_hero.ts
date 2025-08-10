// src/inputs/HeroUpdateInput.ts
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class HeroUpdateInput {
  @Field()
  password: string
  
  @Field(() => Int)
  win_rate: number;

  @Field(() => Int)
  total_talishar_plays: number;
}
