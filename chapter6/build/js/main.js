'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jquery = require('jquery');

var _jquery2 = _interopRequireDefault(_jquery);

var _board = require('./board');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log(444);

var Puzzle = function () {
    function Puzzle() {
        _classCallCheck(this, Puzzle);

        console.log(123);
        this.options = {
            tileSize: 72,
            gameSize: 15,
            animation: false,
            animationTime: 150
        };
        this.initPuzzle((0, _jquery2.default)(document.body), (0, _jquery2.default)('.container'));
    }

    _createClass(Puzzle, [{
        key: 'initPuzzle',
        value: function initPuzzle($container, $board) {
            $container.on('movemove', function (e) {
                e.preventDefault();
            });
            console.log(this.options);
            var board = new _board2.default($board, this.options);
        }
    }]);

    return Puzzle;
}();

exports.default = new Puzzle();