import $ from 'jquery';

export default class Tile {
    constructor(position, board, options) {
        this.position = position;
        this.options = options;
        this.el = '<div></div>';
        this.board = board;
        this.templates = {
            tile: (no) => {
                const top = Math.floor(no/4) * -this.options.tileSize;
                const left = no%4 * -this.options.tileSize;

                return (
                    "<div class='tile' data-position='"+no+"'>" +
                    "<img src='img/onepiece.jpg' draggable='false' style='top:"+top+"px;left:"+left+"px;' />"+
                    "</div>"
                );
            }
        };
        this.render();
    }

    render() {
        this.el = $(this.templates.tile(this.position));
    }

    update(position) {
        this.position = position;
        this.x = (position % 4) * this.options.tileSize;
        this.y = Math.floor(position / 4) * this.options.tileSize;
        this.el.data('position', position).css(this.cssTransform(this.x, this.y));
    }

    setPosition(tile) {
        this.position = tile.position;
        this.x = tile.x;
        this.y = tile.y
        this.el.data('position', position).css(this.cssTransform(this.x,this.y));
    }

    move(x, y) {
        //translate update
        this.el.css(this.cssTransform(x, y));
    }

    getLocationData() {
        return {
            x: this.x,
            y: this.y
        }
    }

    getAvaiableDirection() {
        const row = Math.floor(this.position / 4);
        const col = this.position % 4;
        const slot = this.board.openSlot;
        
        const UP = 0;
        const RIGHT = 1;
        const DOWN = 2;
        const LEFT = 3;

        if (row === slot.row) {
            return col < slot.col ? 1 : 3;
        } else if (col === slot.col) {
            return row < slot.row ? 2 : 0;
        } else {
            return -1;
        }
    }

    cssTransform(x, y) {
        const translation = 'translate(' + x + 'px,' + y + 'px)';
        return {
            '-webkit-transform': translation,
            '-moz-transform': translation,
            '-ms-transform': translation,
            '-o-transform': translation,
            'transform': translation
        };
    }
}