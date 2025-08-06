import { Hero } from "./schema/entities/hero"
import { Tier_Map } from "./schema/entities/tier_map"

const tierThresholds = (winrate: number): string => {
    if(57 <= winrate){
        return 'S'
    } else if (winrate >= 50 && winrate <= 56){
        return 'A'
    } else if (winrate >= 40 && winrate <= 49){
        return 'B'
    } else if (winrate >= 30 && winrate <= 39){
        return 'C'
    } else {
        return 'D'
    }
}

export const tierListAssign = (heroes: Hero[]): Tier_Map => {
    const tierMap: Tier_Map = {
        S: [],
        A: [],
        B: [],
        C: [],
        D: []
    };

    for (const hero of heroes){
        const tier = tierThresholds(hero.win_rate);
        tierMap[tier].push(hero)
    }
    for (const tier in tierMap) {
        tierMap[tier]
          .sort((a, b) => b.total_talishar_plays - a.total_talishar_plays)
      }

    return tierMap
}