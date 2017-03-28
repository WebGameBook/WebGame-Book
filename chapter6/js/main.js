import $ from 'jquery';
import Board from './board';
class Puzzle {
    constructor() {
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
        const board = new Board($board, this.options);
    }
}
export default new Puzzle();