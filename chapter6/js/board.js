import $ from 'jquery';
import Tile from './tile';

const DIRECTION = {
    UP: 0,
    RIGHT: 1,
    DOWN: 2,
    LEFT: 3
};

export default class Board {
    constructor($board, options) {
        this.board = $board;
        this.openSlot = {};
        this.tiles = [];
        this.options = options;
        this.initTiles();
        this.suffleTiles();
        this.update();
        this.render();
    }

    initTiles() {
        for (let i = 0; i < this.options.gameSize; i++) {
            this.tiles.push(new Tile(i, this, this.options));
        }

        this.tiles.push(null);
        this.setOpenSlot(15);
    }

    setOpenSlot(i) {
        this.openSlot = {
            position: i,
            row: Math.floor(i / 4),
            col: i % 4
        };
    }

    suffleTiles() {
        let i, j, temp;
        for (i = this.tiles.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            temp = this.tiles[i];
            this.tiles[i] = this.tiles[j];
            this.tiles[j] = temp;
        }
    }

    clear() {
        this.board.undelegate('.tile', 'click');
        this.board.empty();
    }

    render() {
        for (let i = 0; i < this.tiles.length; i++) {
            if(this.tiles[i]) {
                this.board.append(this.tiles[i].el);
            }
        }

        this.initTouchEvent();
    }

    update() {
        const board = this;

        for (let i = 0, j = this.tiles.length; i < j; i++) {
            if (this.tiles[i]) {
                this.tiles[i].update(i);
            } else {
                this.setOpenSlot(i);
            }
        }

        if (this.gameComplete()) {
            setTimeout( function () {
                window.alert('game end!');
                board.shuffle();
                board.update();
            }, 100);
        }
    }

    gameComplete() {
        let isComplete = true;
        for (let i = 0; i < this.tiles.length; i++) {
            if (this.tiles[i] && ($(this.tiles[i].el[0]).attr('data-position') !== i)) {
                isComplete = false;
            }
        }

        return isComplete;
    }

    preventEvent() {
        let animation = true;
        window.setTimeout(function () {
            animation = false;
        },this.options.animationTime);
    }

    initTouchEvent() {
        const touchedItem = {};
        $('.tile').on('click', (e) => {
            const position = $(e.target).parent().data('position');
            let currentElement = null;
            touchedItem.tile = this.tiles[position];
            touchedItem.direction = touchedItem.tile.getAvaiableDirection();
            touchedItem.position = position;
            currentElement = this.tiles[touchedItem.tile.position];

            if (touchedItem.direction !== -1) {
                switch (touchedItem.direction) {
                    case DIRECTION.UP:
                        touchedItem.tile.y -= this.options.tileSize;
                        touchedItem.tile.position -= 4;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        this.tiles[touchedItem.tile.position].move(currentElement.x, currentElement.y);
                        break;
                    case DIRECTION.LEFT:
                        touchedItem.tile.x -= this.options.tileSize;
                        touchedItem.tile.position -= 1;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        this.tiles[touchedItem.tile.position].move(currentElement.x, currentElement.y);
                        break;
                    case DIRECTION.RIGHT:
                        touchedItem.tile.x += this.options.tileSize;
                        touchedItem.tile.position += 1;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        this.tiles[touchedItem.tile.position].move(currentElement.x, currentElement.y);
                        break;
                    case DIRECTION.DOWN:
                        touchedItem.tile.y += this.options.tileSize;
                        touchedItem.tile.position += 4;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        this.tiles[touchedItem.tile.position].move(currentElement.x, currentElement.y);
                        break;
                }

                this.update();
            }
        });
    }
}