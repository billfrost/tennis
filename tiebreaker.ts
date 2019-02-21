import { Contest } from "./contest"

export class Tiebreaker implements Contest {
    points = [0, 0];
    winner: number = undefined;

    constructor() {}

    awardPoint(player: number): boolean {
        const opponent = player ^ 1;

        this.points[player]++;
        if (this.points[player] > 6 && this.points[player] - this.points[opponent] > 1) {
            this.winner = player;
        }
        return this.winner !== undefined;
    }

    getWinner(): number {
        return this.winner;
    }

    getScore(server: number): string {
        const receiver = server ^ 1;
        return `${this.points[server]}-${this.points[receiver]}`;
    }
}
