import { Resolver, Query, Arg } from "type-graphql";
import { AppDataSource } from "../../data_source";
import { Time_Period } from "../entities/time_period";

@Resolver()
export class TimePeriodResolver {
    private timePeriodRepo = AppDataSource.getRepository(Time_Period);

    @Query(() => Time_Period)
    async time_period(@Arg("year") year: number, @Arg("month") month: string): Promise<Time_Period>{
        const timePeriodId = await this.timePeriodRepo.findOne({where: {year, month}})
        if (!timePeriodId) throw new Error("No time period found")
        return timePeriodId
    }
}