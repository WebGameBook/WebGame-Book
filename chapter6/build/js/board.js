'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _tile = require('./tile');

var _tile2 = _interopRequireDefault(_tile);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = function () {
    function Board($board, options) {
        _classCallCheck(this, Board);

        this.board = $board;
        this.openSlot = {};
        this.tiles = [];
        this.options = options;
        this.initTiles();
        this.suffleTiles();
        this.render();
        this.update();
    }

    _createClass(Board, [{
        key: 'initTiles',
        value: function initTiles() {
            for (var i = 0; i < this.options.gameSize; i++) {
                this.tiles.push(new _tile2.default(i, this, this.options));
            }

            this.tiles.push(null);
            this.setOpenSlot(15);
        }
    }, {
        key: 'suffleTiles',
        value: function suffleTiles() {
            var i = void 0,
                j = void 0,
                temp = void 0;
            for (i = this.tiles.length - 1; i > 0; i--) {
                j = ~~(Math.random() * (i + 1));
                temp = this.tiles[i];
                this.tiles[i] = this.tiles[j];
                this.tiles[j] = temp;
            }
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.board.undelegate('.tile', 'click');
            this.board.empty();
        }
    }, {
        key: 'render',
        value: function render() {
            for (var i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i]) {
                    this.board.append(this.tiles[i].el);
                }
            }

            this.initTouchEvent();
        }
    }, {
        key: 'update',
        value: function update() {
            var board = this;

            for (var i = 0, j = this.tiles.length; i < j; i++) {
                if (this.tiles[i]) {
                    this.tiles[i].update(i);
                } else {
                    this.setOpenSlot(i);
                }
            }

            if (this.gameComplete()) {
                setTimeout(function () {
                    window.alert('game end!');
                    board.shuffle();
                    board.update();
                }, 100);
            }
        }
    }, {
        key: 'gameComplete',
        value: function gameComplete() {
            var isComplete = true;

            for (var i = 0; i < this.tiles.length; i++) {
                if (this.tiles[i] && this.tiles[i].id !== i) {
                    isComplete = false;
                }
            }

            return isComplete;
        }
    }, {
        key: 'preventEvent',
        value: function preventEvent() {
            var animation = true;
            window.setTimeout(function () {
                animation = false;
            }, this.options.animationTime);
        }
    }, {
        key: 'setOpenSlot',
        value: function setOpenSlot(i) {
            this.openSlot = {
                position: i,
                row: ~~(i / 4),
                col: i % 4
            };
        }
    }, {
        key: 'initTouchEvent',
        value: function initTouchEvent() {
            var _this = this;

            var touchedItem = {};
            this.board.delegate('.tile', 'click', function (e) {
                var position = (0, _jquery2.default)(e.target).parent().data('position');

                touchedItem.tile = _this.tiles[position];
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
                            touchedItem.tile.y -= _this.options.tileSize;
                            touchedItem.tile.position -= 4;
                            _this.tiles[touchedItem.tile.position] = touchedItem.tile;
                            _this.tiles[position] = null;
                            break;
                        case 3:
                            touchedItem.tile.x -= _this.options.tileSize;
                            touchedItem.tile.position -= 1;
                            _this.tiles[touchedItem.tile.position] = touchedItem.tile;
                            _this.tiles[position] = null;
                            break;
                        case 1:
                            touchedItem.tile.x += _this.options.tileSize;
                            touchedItem.tile.position += 1;
                            _this.tiles[touchedItem.tile.position] = touchedItem.tile;
                            _this.tiles[position] = null;
                            break;
                        case 2:
                            touchedItem.tile.y += _this.options.tileSize;
                            touchedItem.tile.position += 4;
                            _this.tiles[touchedItem.tile.position] = touchedItem.tile;
                            _this.tiles[position] = null;
                            break;
                    }
                    _this.clear();
                    _this.render();
                    _this.update();
                }
            });
        }
    }]);

    return Board;
}();

exports.default = Board;