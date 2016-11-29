/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _tetris = __webpack_require__(2);
	
	var _tetris2 = _interopRequireDefault(_tetris);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var game = new _tetris2.default({
	    canvas: document.getElementById("tetris-board")
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _animation = __webpack_require__(3);
	
	var _animation2 = _interopRequireDefault(_animation);
	
	var _image_loader = __webpack_require__(4);
	
	var _image_loader2 = _interopRequireDefault(_image_loader);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var requestAnimationFrame = function () {
	    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function (callback) {
	        return window.setTimeout(callback, 1000 / 60);
	    };
	}();
	
	var cancelAnimationFrame = function () {
	    return window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || clearTimeout;
	}();
	
	var randomProperty = function randomProperty(obj) {
	    var keys = Object.keys(obj),
	        randomKeyIndex = Math.floor(keys.length * Math.random());
	    return obj[keys[randomKeyIndex]];
	};
	
	var randomPropertyName = function randomPropertyName(obj) {
	    var keys = Object.keys(obj),
	        randomKeyIndex = Math.floor(keys.length * Math.random());
	    return keys[randomKeyIndex];
	};
	
	var SHAPE = {
	    I: [[1, 1, 1, 1]],
	    S: [[0, 1, 1], [1, 1, 0]],
	    Z: [[1, 1, 0], [0, 1, 1]],
	    O: [[1, 1], [1, 1]],
	    T: [[1, 1, 1], [0, 1, 0]],
	    L: [[1, 1, 1], [1, 0, 0]],
	    J: [[1, 1, 1], [0, 0, 1]]
	};
	
	var IMAGE_URL = [__webpack_require__(5), __webpack_require__(6), __webpack_require__(7), __webpack_require__(8), __webpack_require__(9), __webpack_require__(10), __webpack_require__(11)];
	
	var BUTTON_IMG = {
	    left: __webpack_require__(12),
	    right: __webpack_require__(13),
	    down: __webpack_require__(14),
	    rotate: __webpack_require__(15)
	};
	
	var Tetris = function () {
	    function Tetris(options) {
	        _classCallCheck(this, Tetris);
	
	        this.canvas = options.canvas;
	        this.context = this.canvas.getContext("2d");
	
	        this.cols = 10; // block 가로
	        this.rows = 20;
	        this.board = [];
	        this.block = null;
	        this.tickSize = 200;
	        this.prevTick = Date.now();
	        this.blockStopsNextTick = false;
	        this.blockSize = {
	            w: 0,
	            h: 0
	        };
	        this.buttonSize = {
	            w: 0,
	            h: 0
	        };
	
	        this.requestId = 0;
	        this.gameStatus = "";
	
	        this.controlButtons = [];
	
	        this.animations = [];
	        this.animationImageUrl = __webpack_require__(16);
	        this.loadImages(this.animationImageUrl);
	
	        this.blockImages = [];
	
	        this.init();
	    }
	
	    _createClass(Tetris, [{
	        key: 'loadImages',
	        value: function loadImages(images, callback) {
	            var loader = new _image_loader2.default(images);
	            loader.done(callback);
	            loader.load();
	        }
	    }, {
	        key: 'init',
	        value: function init() {
	            var _this = this;
	
	            this.resizeCanvas();
	            this.loadImages(IMAGE_URL, function () {
	                var _iteratorNormalCompletion = true;
	                var _didIteratorError = false;
	                var _iteratorError = undefined;
	
	                try {
	                    for (var _iterator = IMAGE_URL[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                        var url = _step.value;
	
	                        var image = new Image();
	                        image.src = url;
	                        _this.blockImages.push(image);
	                    }
	
	                    // 새 블록을 보드 최상단 중간지점에 생성
	                } catch (err) {
	                    _didIteratorError = true;
	                    _iteratorError = err;
	                } finally {
	                    try {
	                        if (!_iteratorNormalCompletion && _iterator.return) {
	                            _iterator.return();
	                        }
	                    } finally {
	                        if (_didIteratorError) {
	                            throw _iteratorError;
	                        }
	                    }
	                }
	
	                _this.makeNewBlock(0, _this.cols / 2);
	                _this.addKeyContol();
	
	                var rowsArray = Array(_this.rows).fill();
	                _this.board = rowsArray.map(function () {
	                    return Array(_this.cols).fill(0);
	                });
	
	                _this.requestId = requestAnimationFrame(_this.loop.bind(_this));
	            });
	
	            this.addControlButtons();
	        }
	    }, {
	        key: 'resizeCanvas',
	        value: function resizeCanvas() {
	            var ratio = this.cols / (this.rows + 2),
	                windowWidth = window.innerWidth,
	                windowHeight = window.innerHeight,
	                windowRatio = windowWidth / windowHeight,
	                scaledWidth = 0,
	                scaledHeight = 0;
	
	            if (ratio < windowRatio) {
	                // 가로를 똑같이 1로 놓았을 때, 분모인 세로 길이가 window쪽이 더 짧다는 의미이므로
	                // windowHeight을 기준으로 가로의 길이를 계산해서 캔버스를 조정한다.
	                // 가로로 여백이 발생한다.
	                scaledHeight = windowHeight;
	                scaledWidth = windowHeight * ratio;
	            } else {
	                // 가로를 똑같이 1로 놓았을 때, 분자인 가로 길이가 window쪽이 더 짧다는 의미이므로
	                // windowWidth를 기준으로 가로의 길이를 계산해서 캔버스를 조정한다.
	                // 가로로 여백이 발생한다.
	                scaledWidth = windowWidth;
	                scaledHeight = windowWidth / ratio;
	            }
	
	            this.canvas.width = scaledWidth;
	            this.canvas.height = scaledHeight;
	
	            this.blockSize = {
	                w: this.canvas.width / this.cols,
	                h: this.canvas.height / (this.rows + 2)
	            };
	            this.buttonSize = {
	                w: this.blockSize.w * 2.5,
	                h: this.blockSize.h * 2
	            };
	        }
	    }, {
	        key: 'dropNewBlock',
	        value: function dropNewBlock() {
	            this.makeNewBlock(0, Math.ceil(this.cols / 2));
	
	            if (!this.isMovable({ row: 1, col: 0 })) {
	                alert("game over");
	                cancelAnimationFrame(this.requestId);
	                this.gameStatus = "gameover";
	            }
	        }
	    }, {
	        key: 'loop',
	        value: function loop() {
	            var now = Date.now();
	            if (now - this.prevTick > this.tickSize) {
	                if (this.blockStopsNextTick && !this.isMovable({ row: 1, col: 0 })) {
	                    this.addBlockToBoard();
	                    this.dropNewBlock();
	                    this.removeCompleteRow();
	                    this.blockStopsNextTick = false;
	                } else if (!this.isMovable({ row: 1, col: 0 })) {
	                    this.blockStopsNextTick = true;
	                } else {
	                    this.blockStopsNextTick = false;
	                    this.moveBlock(1, 0);
	                }
	
	                this.prevTick = now;
	            }
	
	            var _iteratorNormalCompletion2 = true;
	            var _didIteratorError2 = false;
	            var _iteratorError2 = undefined;
	
	            try {
	                for (var _iterator2 = this.animations[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	                    var animation = _step2.value;
	
	                    animation.update();
	                }
	            } catch (err) {
	                _didIteratorError2 = true;
	                _iteratorError2 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion2 && _iterator2.return) {
	                        _iterator2.return();
	                    }
	                } finally {
	                    if (_didIteratorError2) {
	                        throw _iteratorError2;
	                    }
	                }
	            }
	
	            this.render();
	
	            if (this.gameStatus === "gameover") {
	                return;
	            }
	            this.requestId = requestAnimationFrame(this.loop.bind(this));
	        }
	    }, {
	        key: 'addBlockToBoard',
	        value: function addBlockToBoard() {
	            for (var row = 0; row < this.block.rows; row++) {
	                for (var col = 0; col < this.block.cols; col++) {
	                    if (this.block.shape[row][col] > 0) {
	                        this.board[this.block.position.row + row][this.block.position.col + col] = this.block.color;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'isMovable',
	        value: function isMovable(offset) {
	            var block = this.block,
	                newBlockPosition = {
	                row: block.position.row + offset.row,
	                col: block.position.col + offset.col
	            };
	
	            for (var row = 0; row < block.rows; row++) {
	                for (var col = 0; col < block.cols; col++) {
	                    var isOutOfBoundary = !this.blockIsWithinBoundary(offset);
	                    var isOverlap = !isOutOfBoundary && block.shape[row][col] > 0 && this.board[newBlockPosition.row + row][newBlockPosition.col + col] > 0;
	
	                    if (isOutOfBoundary || isOverlap) {
	                        return false;
	                    }
	                }
	            }
	
	            return true;
	        }
	    }, {
	        key: 'removeCompleteRow',
	        value: function removeCompleteRow() {
	            var _this2 = this;
	
	            var removeRow = function removeRow(rowIndex) {
	                _this2.board.splice(rowIndex, 1);
	                _this2.board.splice(0, 0, Array(_this2.cols).fill(0));
	            },
	                rowIndex = -1,
	                blockSize = this.blockSize;
	
	            var _loop = function _loop(row) {
	                if (_this2.board[row].every(function (value) {
	                    return value > 0;
	                })) {
	                    for (var col = 0; col < _this2.cols; col++) {
	                        var animation = new _animation2.default({
	                            x: col * blockSize.w * 0.95,
	                            y: row * blockSize.h * 0.95,
	                            width: blockSize.w * 1.5,
	                            height: blockSize.h * 1.5,
	                            frameWidth: 64,
	                            frameHeight: 64,
	                            frames: 10,
	                            image: _this2.animationImageUrl,
	                            interval: 30
	                        });
	                        _this2.animations.push(animation);
	                        animation.start();
	
	                        if (col === _this2.cols - 1) {
	                            animation.done(function () {
	                                removeRow(row);
	                                _this2.animations = [];
	                            });
	                        }
	                        _this2.board[row] = Array(_this2.cols).fill(0);
	                    }
	                }
	            };
	
	            for (var row = 0; row < this.rows; row++) {
	                _loop(row);
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var color = void 0,
	                blockSize = this.blockSize;
	            // row, col;
	
	            this.context.fillStyle = "#000"; //background
	            this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
	
	            // 쌓인 블록을 그림
	            var _iteratorNormalCompletion3 = true;
	            var _didIteratorError3 = false;
	            var _iteratorError3 = undefined;
	
	            try {
	                for (var _iterator3 = this.board.entries()[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	                    var _step3$value = _slicedToArray(_step3.value, 2),
	                        row = _step3$value[0],
	                        rowArray = _step3$value[1];
	
	                    var _iteratorNormalCompletion7 = true;
	                    var _didIteratorError7 = false;
	                    var _iteratorError7 = undefined;
	
	                    try {
	                        for (var _iterator7 = rowArray.entries()[Symbol.iterator](), _step7; !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done); _iteratorNormalCompletion7 = true) {
	                            var _step7$value = _slicedToArray(_step7.value, 2),
	                                col = _step7$value[0],
	                                cell = _step7$value[1];
	
	                            if (cell > 0) {
	                                var image = this.blockImages[cell - 1];
	                                this.context.drawImage(image, col * blockSize.w, row * blockSize.h, blockSize.w, blockSize.h);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError7 = true;
	                        _iteratorError7 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion7 && _iterator7.return) {
	                                _iterator7.return();
	                            }
	                        } finally {
	                            if (_didIteratorError7) {
	                                throw _iteratorError7;
	                            }
	                        }
	                    }
	                }
	
	                // 떨어지는 블록을 그림
	            } catch (err) {
	                _didIteratorError3 = true;
	                _iteratorError3 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion3 && _iterator3.return) {
	                        _iterator3.return();
	                    }
	                } finally {
	                    if (_didIteratorError3) {
	                        throw _iteratorError3;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion4 = true;
	            var _didIteratorError4 = false;
	            var _iteratorError4 = undefined;
	
	            try {
	                for (var _iterator4 = this.block.shape.entries()[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	                    var _step4$value = _slicedToArray(_step4.value, 2),
	                        row = _step4$value[0],
	                        rowArray = _step4$value[1];
	
	                    var _iteratorNormalCompletion8 = true;
	                    var _didIteratorError8 = false;
	                    var _iteratorError8 = undefined;
	
	                    try {
	                        for (var _iterator8 = rowArray.entries()[Symbol.iterator](), _step8; !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done); _iteratorNormalCompletion8 = true) {
	                            var _step8$value = _slicedToArray(_step8.value, 2),
	                                col = _step8$value[0],
	                                cell = _step8$value[1];
	
	                            if (cell > 0) {
	                                var _image = this.blockImages[this.block.color - 1];
	                                this.context.drawImage(_image, (this.block.position.col + col) * blockSize.w, (this.block.position.row + row) * blockSize.h, blockSize.w, blockSize.h);
	                            }
	                        }
	                    } catch (err) {
	                        _didIteratorError8 = true;
	                        _iteratorError8 = err;
	                    } finally {
	                        try {
	                            if (!_iteratorNormalCompletion8 && _iterator8.return) {
	                                _iterator8.return();
	                            }
	                        } finally {
	                            if (_didIteratorError8) {
	                                throw _iteratorError8;
	                            }
	                        }
	                    }
	                }
	            } catch (err) {
	                _didIteratorError4 = true;
	                _iteratorError4 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion4 && _iterator4.return) {
	                        _iterator4.return();
	                    }
	                } finally {
	                    if (_didIteratorError4) {
	                        throw _iteratorError4;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion5 = true;
	            var _didIteratorError5 = false;
	            var _iteratorError5 = undefined;
	
	            try {
	                for (var _iterator5 = this.controlButtons[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	                    var button = _step5.value;
	
	                    button.render();
	                }
	            } catch (err) {
	                _didIteratorError5 = true;
	                _iteratorError5 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion5 && _iterator5.return) {
	                        _iterator5.return();
	                    }
	                } finally {
	                    if (_didIteratorError5) {
	                        throw _iteratorError5;
	                    }
	                }
	            }
	
	            var _iteratorNormalCompletion6 = true;
	            var _didIteratorError6 = false;
	            var _iteratorError6 = undefined;
	
	            try {
	                for (var _iterator6 = this.animations[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	                    var animation = _step6.value;
	
	                    animation.render(this.context);
	                }
	            } catch (err) {
	                _didIteratorError6 = true;
	                _iteratorError6 = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion6 && _iterator6.return) {
	                        _iterator6.return();
	                    }
	                } finally {
	                    if (_didIteratorError6) {
	                        throw _iteratorError6;
	                    }
	                }
	            }
	        }
	    }, {
	        key: 'addKeyContol',
	        value: function addKeyContol() {
	            var _this3 = this;
	
	            document.body.addEventListener("keydown", function (e) {
	                switch (e.keyCode) {
	                    case 37:
	                        // left
	                        e.preventDefault();
	                        _this3.moveBlock(0, -1);
	                        break;
	                    case 38:
	                        // up
	                        e.preventDefault();
	                        _this3.rotateBlock(false);
	                        break;
	                    case 39:
	                        // right
	                        e.preventDefault();
	                        _this3.moveBlock(0, 1);
	                        break;
	                    case 40:
	                        // down
	                        e.preventDefault();
	                        _this3.moveBlock(1, 0);
	                        break;
	                    default:
	                        break;
	                }
	            });
	        }
	    }, {
	        key: 'makeNewBlock',
	        value: function makeNewBlock(row, col) {
	            var randomShape = randomProperty(SHAPE),
	                randomColor = Math.floor(Math.random() * IMAGE_URL.length) + 1;
	
	            this.block = {
	                color: randomColor,
	                shape: randomShape,
	                position: { row: row, col: col },
	                rows: randomShape.length,
	                cols: randomShape[0].length
	            };
	        }
	    }, {
	        key: 'moveBlock',
	        value: function moveBlock(row, col) {
	            if (!this.isMovable({ row: row, col: col })) {
	                return;
	            }
	
	            this.block.position.row += row;
	            this.block.position.col += col;
	        }
	    }, {
	        key: 'rotateBlock',
	        value: function rotateBlock(clockwise) {
	            var oldCols = this.block.cols,
	                oldRows = this.block.rows,
	                oldShape = this.block.shape,
	
	            // rotate 후에는 원래의 가로 * 세로 사이즈가 서로 뒤바뀌기 때문에.
	            newShape = Array(oldCols).fill().map(function () {
	                return Array(oldRows);
	            });
	
	            for (var row = 0; row < oldCols; row++) {
	                for (var col = 0; col < oldRows; col++) {
	                    newShape[row][col] = this.block.shape[oldRows - 1 - col][row];
	                }
	            }
	
	            this.block.shape = newShape;
	            this.block.rows = oldCols;
	            this.block.cols = oldRows;
	
	            if (!this.isMovable({ row: 0, col: 0 })) {
	                this.block.shape = oldShape;
	                this.block.rows = oldRows;
	                this.block.cols = oldCols;
	            }
	        }
	    }, {
	        key: 'blockIsWithinBoundary',
	        value: function blockIsWithinBoundary(offset) {
	            var tempPosition = {
	                row: this.block.position.row + offset.row,
	                col: this.block.position.col + offset.col
	            };
	
	            return tempPosition.row >= 0 && tempPosition.col >= 0 && tempPosition.row + this.block.rows <= this.rows && tempPosition.col + this.block.cols <= this.cols;
	        }
	    }, {
	        key: 'addControlButtons',
	        value: function addControlButtons() {
	            var _this4 = this;
	
	            var buttonSizes = this.buttonSize,
	                leftButton = new Button({
	                x: 0,
	                y: this.blockSize.h * 20,
	                width: buttonSizes.w,
	                height: buttonSizes.h,
	                img: BUTTON_IMG.left,
	                canvas: this.canvas
	            }),
	                downButton = new Button({
	                x: buttonSizes.w,
	                y: this.blockSize.h * 20,
	                width: buttonSizes.w,
	                height: buttonSizes.h,
	                img: BUTTON_IMG.down,
	                canvas: this.canvas
	            }),
	                rotateButton = new Button({
	                x: buttonSizes.w * 2,
	                y: this.blockSize.h * 20,
	                width: buttonSizes.w,
	                height: buttonSizes.h,
	                img: BUTTON_IMG.rotate,
	                canvas: this.canvas
	            }),
	                rightButton = new Button({
	                x: buttonSizes.w * 3,
	                y: this.blockSize.h * 20,
	                width: buttonSizes.w,
	                height: buttonSizes.h,
	                img: BUTTON_IMG.right,
	                canvas: this.canvas
	            });
	
	            leftButton.onTouchend(function () {
	                _this4.moveBlock(0, -1);
	            });
	            rightButton.onTouchend(function () {
	                _this4.moveBlock(0, 1);
	            });
	            rotateButton.onTouchend(function () {
	                _this4.rotateBlock();
	            });
	            downButton.onTouchend(function () {
	                _this4.moveBlock(1, 0);
	            });
	
	            this.controlButtons.push(leftButton);
	            this.controlButtons.push(rightButton);
	            this.controlButtons.push(rotateButton);
	            this.controlButtons.push(downButton);
	        }
	    }]);
	
	    return Tetris;
	}();
	
	exports.default = Tetris;
	
	var Button = function () {
	    function Button(props) {
	        _classCallCheck(this, Button);
	
	        this._callback = function () {};
	        this.x = props.x || 0;
	        this.y = props.y || 0;
	        this.width = props.width || 0;
	        this.height = props.height || 0;
	        this.imageUrl = props.img || "";
	        this.canvas = props.canvas;
	        this.context = this.canvas.getContext("2d");
	        this.image = undefined;
	
	        this.init();
	    }
	
	    _createClass(Button, [{
	        key: 'init',
	        value: function init() {
	            var _this5 = this;
	
	            this.canvas.addEventListener("touchend", function (e) {
	                var touchX = e.changedTouches[0].clientX,
	                    touchY = e.changedTouches[0].clientY;
	
	                if (touchX > _this5.x && touchX < _this5.x + _this5.width && touchY > _this5.y && touchY < _this5.y + _this5.height) {
	                    _this5._callback();
	                }
	            });
	            var loader = new _image_loader2.default(this.imageUrl);
	            loader.done(function () {
	                _this5.image = new Image();
	                _this5.image.src = _this5.imageUrl;
	            });
	            loader.load();
	        }
	    }, {
	        key: 'render',
	        value: function render(context) {
	            if (this.image) {
	                this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
	            }
	        }
	    }, {
	        key: 'onTouchend',
	        value: function onTouchend(callback) {
	            this._callback = callback;
	        }
	    }, {
	        key: 'off',
	        value: function off() {
	            this._callback = function () {};
	        }
	    }]);

	    return Button;
	}();

/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var STATUS = {
	    PENDING: 1,
	    RUNNING: 2,
	    STOPPED: 3
	};
	
	var Animation = function () {
	    function Animation(option) {
	        _classCallCheck(this, Animation);
	
	        this.imageUrl = option.image;
	        this.position = {
	            x: option.x,
	            y: option.y
	        };
	        this.size = {
	            width: option.width,
	            height: option.height
	        };
	        this.frameSize = {
	            width: option.frameWidth,
	            height: option.frameHeight
	        };
	        this.frames = option.frames;
	        this.loop = option.loop || false;
	        this.interval = option.interval || 100;
	
	        this._currentFrame = 0;
	
	        this._image = new Image();
	        this._image.src = this.imageUrl;
	        this._lastUpdate = 0;
	        this._status = STATUS.PENDING;
	
	        this._callback = function () {};
	    }
	
	    _createClass(Animation, [{
	        key: "update",
	        value: function update() {
	            if (this.status !== STATUS.RUNNING) {
	                return;
	            }
	
	            var now = new Date();
	            if (now - this._lastUpdate >= this.interval) {
	                this._currentFrame++;
	
	                if (this._currentFrame >= this.frames) {
	                    this._currentFrame = this.loop ? 0 : -1;
	                }
	                this._lastUpdate = now;
	            }
	
	            if (this._currentFrame === -1) {
	                this._stop();
	            }
	        }
	    }, {
	        key: "_stop",
	        value: function _stop() {
	            this.status = STATUS.STOPPED;
	            this._callback();
	        }
	    }, {
	        key: "start",
	        value: function start() {
	            this._lastUpdate = new Date();
	            this.status = STATUS.RUNNING;
	        }
	    }, {
	        key: "done",
	        value: function done(callback) {
	            this._callback = callback;
	        }
	    }, {
	        key: "render",
	        value: function render(context) {
	            if (this.status !== STATUS.RUNNING) {
	                return;
	            }
	
	            var sx = this.frameSize.width * this._currentFrame,
	                sy = 0,
	                sw = this.frameSize.width,
	                sh = this.frameSize.height,
	                dx = this.position.x,
	                dy = this.position.y,
	                dw = this.size.width,
	                dh = this.size.height;
	
	            context.drawImage(this._image, sx, sy, sw, sh, dx, dy, dw, dh);
	        }
	    }]);
	
	    return Animation;
	}();
	
	exports.default = Animation;

/***/ },
/* 4 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ImageLoader = function () {
	    function ImageLoader(imageUrl) {
	        _classCallCheck(this, ImageLoader);
	
	        this.imageUrls = [];
	        this.assets = [];
	        this.loading = false;
	        this.callback = function () {};
	        this.addImage(imageUrl);
	    }
	
	    _createClass(ImageLoader, [{
	        key: "addImage",
	        value: function addImage(imageUrl) {
	            if (this.loading) {
	                console.log("loader cannot add more images while it's loading");
	                return;
	            }
	
	            if (Array.isArray(imageUrl)) {
	                this.imageUrls = this.imageUrls.concat(imageUrl);
	            } else {
	                this.imageUrls.push(imageUrl);
	            }
	        }
	    }, {
	        key: "load",
	        value: function load() {
	            var _this = this;
	
	            this.assets = this.imageUrls.map(function (url) {
	                var image = new Image();
	                image.onload = function () {
	                    return _this.onload(image);
	                };
	                image.src = url;
	
	                return image;
	            });
	        }
	    }, {
	        key: "done",
	        value: function done(callback) {
	            if (typeof callback === "function") {
	                this.callback = callback;
	            }
	        }
	    }, {
	        key: "onload",
	        value: function onload(image) {
	            image.loaded = true;
	
	            if (this.assets.every(function (image) {
	                return image.loaded;
	            })) {
	                this.callback();
	                this.loading = false;
	            }
	        }
	    }]);
	
	    return ImageLoader;
	}();
	
	exports.default = ImageLoader;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "red.png";

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "green.png";

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "lightblue.png";

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "blue.png";

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "pink.png";

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "purple.png";

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "yellow.png";

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "left.png";

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "right.png";

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "down.png";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "rotate.png";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "animation.png";

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map