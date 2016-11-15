'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tile = function () {
    function Tile(id, board, options) {
        var _this = this;

        _classCallCheck(this, Tile);

        this.id = id;
        this.options = options;
        this.el = '<div></div>';
        this.board = board;
        this.templates = {
            tile: function tile(no) {
                var top = ~~(no / 4) * -_this.options.tileSize;
                var left = no % 4 * -_this.options.tileSize;

                return "<div class='tile' data-position='" + no + "'>" + "<img src='img/onepiece.jpg' draggable='false' style='top:" + top + "px;left:" + left + "px;' />" + "</div>";
            }
        };
        this.render();
    }

    _createClass(Tile, [{
        key: 'render',
        value: function render() {
            this.el = (0, _jquery2.default)(this.templates.tile(this.id));
        }
    }, {
        key: 'update',
        value: function update(position) {
            this.position = position;
            this.x = position % 4 * this.options.tileSize;
            this.y = ~~(position / 4) * this.options.tileSize;
            this.el.data('position', position).css(this.cssTransform(this.x, this.y));
        }
    }, {
        key: 'setPosition',
        value: function setPosition(tile) {
            this.position = tile.position;
            this.x = tile.x;
            this.y = tile.y;
            this.el.data('position', position).css(this.cssTransform(this.x, this.y));
        }
    }, {
        key: 'getAvaiableDirection',
        value: function getAvaiableDirection() {
            var row = ~~(this.position / 4);
            var col = this.position % 4;
            var slot = this.board.openSlot;

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
    }, {
        key: 'cssTransform',
        value: function cssTransform(x, y) {
            var translation = 'translate(' + x + 'px,' + y + 'px)';
            return {
                '-webkit-transform': translation,
                '-moz-transform': translation,
                '-ms-transform': translation,
                '-o-transform': translation,
                'transform': translation
            };
        }
    }]);

    return Tile;
}();

exports.default = Tile;