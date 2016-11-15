import $ from 'jquery';
import Board from './board';
console.log(444);
class Puzzle {
    constructor() {
        console.log(123);
        this.options = {
            tileSize: 72,
            gameSize: 15,
            animation: false,
            animationTime: 150,
        };
        this.initPuzzle($(document.body), $('.container'));
    }

    initPuzzle($container, $board) {
        $container.on('movemove', (e) => {
            e.preventDefault();
        });
        console.log(this.options);
        const board = new Board($board, this.options);
    }
}
export default new Puzzle();