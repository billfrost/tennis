import { Contest } from "./contest"

export class Game implements Contest {
    points = [0, 0];
    winner: number = undefined;
    scoring = ['love', '15', '30', '40'];

    constructor() {}

    awardPoint(player: number): boolean {
        const opponent = player ^ 1;

        this.points[player]++;
        if (this.points[player] > 3 && this.points[player] - this.points[opponent] > 1) {
            this.winner = player;
        }
        return this.winner !== undefined;
    }

    getWinner(): number {
        return this.winner;
    }

    getScore(server: number): string {
        const receiver = server ^ 1;

        if (this.points[0] === this.points[1]) {
            if (this.points[0] < 3) {
                return `${this.scoring[this.points[0]]}-all`;
            }
            return 'deuce';
        }
        if (this.points[0] > 2 && this.points[1] > 2) {
            return `advantage ${this.points[server] > this.points[receiver] ? 'server' : 'receiver'}`;
        }

        return `${this.scoring[this.points[server]]}-${this.scoring[this.points[receiver]]}`;
    }
}
