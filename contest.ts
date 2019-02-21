export interface Contest {
    awardPoint(player: number): boolean;
    getScore(player: number): string;
}
