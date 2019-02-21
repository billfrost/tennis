import { Contest } from './contest';
import { Game } from './game';
import { Observable, Subject } from 'rxjs';
import { Tiebreaker } from './tiebreaker';
import { takeUntil } from 'rxjs/operators/takeUntil';

export class Match {
    players: string[];
    gamesWon = [0, 0];
    server: number;
    games: Contest[] = [];

    play(points: Observable<number>, gameOver: Subject<number>): void {
        points.pipe(takeUntil(gameOver)).subscribe((pointWinner: number) => {
            let opponent = pointWinner ^ 1;

            if (this.games[this.games.length - 1].awardPoint(pointWinner)) {
                this.gamesWon[pointWinner]++;
                console.log(`Won by ${this.players[pointWinner]}`);
                if (this.gamesWon[pointWinner] > 5 && this.gamesWon[pointWinner] - this.gamesWon[opponent] > 1 || this.games[this.games.length - 1] instanceof Tiebreaker) {
                    return gameOver.next(pointWinner);
                }
                if (this.gamesWon[0] == 6 && this.gamesWon[1] == 6) {
                    this.games.push(new Tiebreaker());
                } else {
                    this.games.push(new Game());
                }
                this.server = this.server ^ 1;
            } else {
                console.log(`Server ${this.players[pointWinner]}: ${this.games[this.games.length - 1].getScore(this.server)}`);
            }
        });
    }

    constructor(players: string[], server: number) {
        this.players = players;
        this.server = server;
        this.games.push(new Game());
    }
}
