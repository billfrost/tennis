import { of } from 'rxjs/observable/of';
import { map } from 'rxjs/operators';
import { Match } from './match';
import { Subject } from 'rxjs';

const players = ['bill', 'ted'];
const byName = of(...['ted', 'ted', 'ted', 'ted', 'bill', 'bill', 'bill', 'bill']);
const byNumber = of(1,0,1,0,1,0,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0);
const match = new Match(players, 0);
const gameOver = new Subject<number>();

gameOver.subscribe(x => console.log('Match Winner', players[x]));

match.play(byName.pipe(map<string, number>(name => players.indexOf(name))), gameOver);
match.play(byNumber, gameOver);
