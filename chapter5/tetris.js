/**
 *  요구사항
 *
 */
var randomProperty = function (obj) {
    var keys = Object.keys(obj),
        randomKeyIndex = Math.floor(keys.length * Math.random());
    return obj[keys[randomKeyIndex]];
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

var COLOR_CODE = {
    1: "#f00",
    2: "#00f",
    3: "#f70",
    4: "#ff0",
    5: "#0f0"
};

var Tetris = function (options) {
    this.canvas = options.canvas;
    this.context = this.canvas.getContext("2d");

    this.cols = 10; // block 가로
    this.rows = 20;
    this.board = [];
    this.block = null;
    this.tickSize = 200;
    this.prevTick = Date.now();
    this.init();
};

Tetris.prototype.init = function () {
    var _this = this,
        innerLoopFunc = function () {
            _this.loop();
            requestAnimationFrame(innerLoopFunc);
        };

    requestAnimationFrame(innerLoopFunc);

    for(var row = 0; row < this.rows; row++) {
        this.board.push(Array.apply(null, Array(this.cols)).map(Number.prototype.valueOf,0));
    }
};

Tetris.prototype.start = function () {
    this._addKeyContol();
    this.dropNewBlock();
};

Tetris.prototype.dropNewBlock = function() {
    this.makeNewBlock(0, Math.ceil(this.cols / 2));
};

Tetris.prototype.loop = function() {
    var now = Date.now();
    if (now - this.prevTick > this.tickSize) {
        if (this.blockStopsNextTick) {
            console.log(1);
            this.addBlockToBoard();
            this.dropNewBlock();
            this.removeCompleteRow();
            this.blockStopsNextTick = false;
        } else if (!this.isMovable({row: 1, col: 0})) {
            this.blockStopsNextTick = true;
        } else {
            this.moveBlock(1, 0);
        }

        this.prevTick = now;
    }

    this.render();
};

Tetris.prototype.addBlockToBoard = function () {
    var block = this.block,
        blockWidth = block.cols,
        blockHeight = block.rows;

    for ( var col = 0; col < blockWidth; col++ ) {
        for ( var row = 0; row < blockHeight; row++ ) {
            if ( block.shape[row][col] > 0 ) {
                this.board[ block.position.row + row ][ block.position.col + col ] = block.color;
            }
        }
    }
};

Tetris.prototype.isMovable = function (offset) {
    var block = this.block,
        newBlockPosition = {
            row: block.position.row + offset.row,
            col: block.position.col + offset.col
        },
        row, col,
        isOverlap, isOutOfBoundary;

    for (row = 0; row < block.rows; row++) {
        for (col = 0; col < block.cols; col++) {
            isOutOfBoundary = !this.blockIsWithinBoundary(0, 0, this.rows, this.cols);
            isOverlap = !isOutOfBoundary &&
                          block.shape[row][col] > 0 &&
                          this.board[newBlockPosition.row+ row][newBlockPosition.col + col] > 0;

            if (isOutOfBoundary || isOverlap) {
                return false;
            }
        }
    }
    return true;

};

Tetris.prototype.removeCompleteRow = function () {
    for (var row = 0; row < this.rows; row++) {
        if (this.board[row].every(function( value ) { return value > 0;})) {
            this.board.splice(row, 1);
            this.board.splice(0, 0, new Array( this.cols ));
        }
    }
};

Tetris.prototype.render = function () {
    var color,
        blockSize = {
            w: this.canvas.width / this.cols,
            h: this.canvas.height / this.rows
        },
        row, col;

    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.fillStyle = "#000"; //background
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // 쌓인 블록을 그림
    for (row = 0; row < this.rows; row++) {
        for (col = 0; col < this.cols; col++) {
            if ( this.board[row][col] > 0 ) {
                color = this.board[row][col];
                this.context.fillStyle = COLOR_CODE[color];
                this.context.fillRect(col * blockSize.w, row * blockSize.h, blockSize.w, blockSize.h);
            }
        }
    }

    // 떨어지는 블록을 그림
    for (row = 0; row < this.block.rows; row++ ) {
        for (col = 0; col < this.block.cols; col++ ) {
            if (this.block.shape[row][col] > 0 ) {
            this.context.fillStyle = COLOR_CODE[this.block.color];
            this.context.fillRect( (this.block.position.col + col) * blockSize.w,
                                   (this.block.position.row + row )* blockSize.h,
                                   blockSize.w,
                                   blockSize.h);
            }
        }
    }
};

Tetris.prototype._addKeyContol = function () {
    var game = this;
    document.body.addEventListener("keydown", function (e) {
        switch(e.keyCode) {
            case 37: // left
                e.preventDefault();
                game.moveBlock(0, -1, true);
                break;
            case 38: // up
                e.preventDefault();
                game.rotateBlock();
                break;
            case 39: // right
                e.preventDefault();
                game.moveBlock(0, 1, true);
                break;
            case 40: // down
                e.preventDefault();
                game.moveBlock(1, 0, true);
                break;
            default: break;
        }
    });
};

Tetris.prototype.makeNewBlock = function (row, col) {
    var randomShape = randomProperty(SHAPE),
        randomColor = Math.floor(Math.random() * 5) + 1;

    this.block = {
        color: randomColor,
        shape: randomShape,
        position: {
            row: row,
            col: col
        },
        rows: randomShape.length,
        cols: randomShape[0].length
    };
};

Tetris.prototype.moveBlock = function(row, col) {
    if (!this.isMovable({row: row, col: col})) {
        return;
    }

    this.block.position.col += col;
    this.block.position.row += row;
};

Tetris.prototype.rotateBlock = function() {
    var newShape = [],
        oldCols = this.block.cols,
        oldRows = this.block.rows,
        row, col;

    // rotate 후에는 원래의 가로 * 세로 사이즈가 서로 뒤바뀌기 때문에.
    for(row = 0; row < oldCols; row++) {
        newShape.push([]);
    }

    for(row = 0; row < oldCols; row++) {
        for (col = 0; col < oldRows; col++) {
            newShape[ row ][ col ] = this.block.shape[oldRows - col - 1][row];
        }
    }

    this.block.shape = newShape;
    this.block.rows = oldCols;
    this.block.cols = oldRows;
};

Tetris.prototype.blockIsWithinBoundary = function (row, col, rows, cols) {
    return this.block.position.row >= row &&
            this.block.position.col >= col &&
            this.block.position.row + this.block.rows < row + rows &&
            this.block.position.col + this.block.cols < col + cols;
};
