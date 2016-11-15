import $ from 'jquery';
import Tile from './tile';

export default class Board {
    constructor($board, options) {
        this.board = $board;
        this.openSlot = {};
        this.tiles = [];
        this.options = options;
        this.initTiles();
        this.suffleTiles();
        this.render();
        this.update();
    }

    initTiles() {
        for (let i = 0; i < this.options.gameSize; i++) {
            this.tiles.push(new Tile(i, this, this.options));
        }

        this.tiles.push(null);
        this.setOpenSlot(15);
    }

    suffleTiles() {
        let i, j, temp;
        for (i = this.tiles.length - 1; i > 0; i--) {
            j = ~~(Math.random() * (i + 1));
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
            if (this.tiles[i] && (this.tiles[i].id !== i)) {
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

    setOpenSlot(i) {
        this.openSlot = {
            position: i,
            row: ~~(i / 4),
            col: i % 4
        };
    }

    initTouchEvent() {
        const touchedItem = {};
        this.board.delegate('.tile', 'click', (e) => {
            const position = $(e.target).parent().data('position');

            touchedItem.tile = this.tiles[position];
            touchedItem.direction = touchedItem.tile.getAvaiableDirection();
            touchedItem.position = position;

            if (touchedItem.direction !== -1) {
                /*
                    0 : up
                    1 : right
                    2 : down
                    3 : left
                */
                switch (touchedItem.direction) {
                    case 0:
                        touchedItem.tile.y -= this.options.tileSize;
                        touchedItem.tile.position -= 4;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        break;
                    case 3:
                        touchedItem.tile.x -= this.options.tileSize;
                        touchedItem.tile.position -= 1;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        break;
                    case 1:
                        touchedItem.tile.x += this.options.tileSize;
                        touchedItem.tile.position += 1;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        break;
                    case 2:
                        touchedItem.tile.y += this.options.tileSize;
                        touchedItem.tile.position += 4;
                        this.tiles[touchedItem.tile.position] = touchedItem.tile;
                        this.tiles[position] = null;
                        break;
                }
                this.clear();
                this.render();
                this.update();
            }
        });
    }
}