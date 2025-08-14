import { Hero } from "./schema/entities/hero"
import { Tier_Map } from "./schema/entities/tier_map"

export const newTierThreshold = (heroes: Hero[]): Tier_Map => {
    const tierMap: Tier_Map = {
        S: [],
        A: [],
        B: [],
        C: [],
        D: []
    };
    if(heroes.length === 0){
        return tierMap
    }

    heroes.sort((a, b)=> b.win_rate - a.win_rate)
    const N = heroes.length;
    const totalGames = heroes.reduce((sum, d) => d.total_talishar_plays + sum, 0)
    const MIN_SHARE = 0.01
    // Calculate mean & std dev for eligible decks
    const eligibleDecks = heroes.filter(d => d.total_talishar_plays / totalGames >= MIN_SHARE);
    const meanWR = eligibleDecks.reduce((sum, d) => sum + d.win_rate, 0) / eligibleDecks.length;
    const stdDev = Math.sqrt(
    eligibleDecks.reduce((sum, d) => sum + Math.pow(d.win_rate - meanWR, 2), 0) / eligibleDecks.length
    );

    // S-tier rule: must be 2 std dev above mean
    const Z_SCORE_THRESHOLD = 1;
    const sTierExists = eligibleDecks[0].win_rate >= meanWR + Z_SCORE_THRESHOLD * stdDev;

    // Percentile cutoffs
    const sCutoffIndex = Math.ceil(N * 0.05) || 1;
    const aCutoffIndex = sCutoffIndex + Math.ceil(N * 0.15);
    const bCutoffIndex = aCutoffIndex + Math.ceil(N * 0.25);
    const cCutoffIndex = bCutoffIndex + Math.ceil(N * 0.25);

    const sCutoffWR = heroes[sCutoffIndex - 1]?.win_rate ?? 0;

    // Assign tiers and push to groups
    heroes.forEach((deck, i) => {
        const metaShare = deck.total_talishar_plays / totalGames;

        if (sTierExists && i < sCutoffIndex && deck.win_rate >= sCutoffWR && metaShare >= MIN_SHARE) {
            tierMap.S.push(deck);
        } else if (i < aCutoffIndex) {
            tierMap.A.push(deck);
        } else if (i < bCutoffIndex) {
            tierMap.B.push(deck);
        } else if (i < cCutoffIndex) {
            tierMap.C.push(deck);
        } else {
            tierMap.D.push(deck);
        }
    });


    return tierMap;
}
