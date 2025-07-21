// src/resolver/HeroResolver.ts
import { Resolver, Query, Mutation, Arg, Int } from "type-graphql";
import { Hero } from "../entities/hero";
import { HeroInput } from "../inputs/create_hero";
import { HeroUpdateInput } from "../inputs/update_hero";
import { AppDataSource } from "../../data_source";
import { Hero_Image } from "../entities/hero_image";
import { Time_Period } from "../entities/time_period";

@Resolver()
export class HeroResolver {
  private heroRepo = AppDataSource.getRepository(Hero);
  private heroImageRepo = AppDataSource.getRepository(Hero_Image);
  private timePeriodRepo = AppDataSource.getRepository(Time_Period);

  @Query(() => [Hero])
  async heroes(@Arg("timePeriodId", () => Int) timePeriodId: number): Promise<Hero[]> {
    return this.heroRepo.find({where: {time_period: {id: timePeriodId}}});
  }

  @Query(() => Hero, { nullable: true })
  async hero(@Arg("id", () => Int) id: number): Promise<Hero | undefined> {
    return this.heroRepo.findOne({ where: { id } });
  }

  @Mutation(() => Hero)
  async createHero(@Arg("data") data: HeroInput): Promise<Hero> {
    // Find or create related Hero_Image (assuming you want to create it here)
    let heroImage = await this.heroImageRepo.findOne({ where: { name: data.name } });
    if (!heroImage) {
      heroImage = this.heroImageRepo.create({ name: data.name, url: data.url });
      await this.heroImageRepo.save(heroImage);
    }

    // Find the time period by id
    const timePeriod = await this.timePeriodRepo.findOne({ where: { id: data.id_time_period } });
    if (!timePeriod) throw new Error("Invalid time_period id");

    const hero = this.heroRepo.create({
      win_rate: data.win_rate,
      total_talishar_plays: data.total_talishar_plays,
      hero_details: heroImage,
      time_period: timePeriod,
    });

    return this.heroRepo.save(hero);
  }

  @Mutation(() => Hero)
  async updateHero(
    @Arg("id", () => Int) id: number,
    @Arg("data") data: HeroUpdateInput
  ): Promise<Hero | null> {
    const hero = await this.heroRepo.findOne({ where: { id } });
    if (!hero) return null;

    hero.win_rate = data.win_rate;
    hero.total_talishar_plays = data.total_talishar_plays;

    return this.heroRepo.save(hero);
  }

  @Mutation(() => Hero)
  async deleteHero(@Arg("id", () => Int) id: number): Promise<Hero | null> {
    const hero = await this.heroRepo.findOne({ where: { id } });
    if (!hero) return null;

    await this.heroRepo.remove(hero);
    return hero;
  }
}
