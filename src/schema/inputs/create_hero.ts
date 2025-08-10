// src/inputs/HeroInput.ts
import { InputType, Field, Int } from "type-graphql";

@InputType()
export class HeroInput {
  @Field()
  password: string
  
  @Field()
  name: string;

  @Field({nullable: true})
  url?: string;

  @Field(() => Int)
  win_rate: number;

  @Field(() => Int)
  total_talishar_plays: number;

  @Field(() => Int)
  id_time_period: number;
}



//"Variable "$data" of required type "HeroInput!" was not provided."