import $ from 'jquery';

export default class Tile {
    constructor(id, board, options) {
        this.id = id;
        this.options = options;
        this.el = '<div></div>';
        this.board = board;
        this.templates = {
            tile: (no) => {
                const top = ~~(no/4) * -this.options.tileSize;
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
        this.el = $(this.templates.tile(this.id));
    }

    update(position) {
        this.position = position;
        this.x = (position % 4) * this.options.tileSize;
        this.y = ~~(position / 4) * this.options.tileSize;
        this.el.data('position', position).css(this.cssTransform(this.x, this.y));
    }

    setPosition(tile) {
        this.position = tile.position;
        this.x = tile.x;
        this.y = tile.y
        this.el.data('position', position).css(this.cssTransform(this.x,this.y));
    }

    getAvaiableDirection() {
        const row = ~~(this.position / 4);
        const col = this.position % 4;
        const slot = this.board.openSlot;

        /*
            0 : up
            1 : right
            2 : down
            3 : left
        */
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