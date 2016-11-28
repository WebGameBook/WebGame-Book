import Animation from './animation';
import ImageLoader from './image_loader';

const requestAnimationFrame = (function () {
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback){
            return window.setTimeout(callback, 1000 / 60);
        };
})();

const cancelAnimationFrame = (function () {
    return window.cancelAnimationFrame     ||
        window.webkitCancelAnimationFrame ||
        window.mozCancelAnimationFrame    ||
        clearTimeout;
})();

const randomProperty = function (obj) {
    let keys = Object.keys(obj),
        randomKeyIndex = Math.floor(keys.length * Math.random());
    return obj[keys[randomKeyIndex]];
};

const randomPropertyName = function (obj) {
    let keys = Object.keys(obj),
        randomKeyIndex = Math.floor(keys.length * Math.random());
    return keys[randomKeyIndex];
};

const SHAPE = {
    I: [[1, 1, 1, 1]],
    S: [[0, 1, 1], [1, 1, 0]],
    Z: [[1, 1, 0], [0, 1, 1]],
    O: [[1, 1], [1, 1]],
    T: [[1, 1, 1], [0, 1, 0]],
    L: [[1, 1, 1], [1, 0, 0]],
    J: [[1, 1, 1], [0, 0, 1]]
};

const IMAGE_URL = [
    require("../img/red.png"),
    require("../img/green.png"),
    require("../img/lightblue.png"),
    require("../img/blue.png"),
    require("../img/pink.png"),
    require("../img/purple.png"),
    require("../img/yellow.png")
];

const BUTTON_IMG = {
    left: require("../img/left.png"),
    right: require("../img/right.png"),
    down: require("../img/down.png"),
    rotate: require("../img/rotate.png"),
};

export default class Tetris {
    constructor(options) {
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
        this.animationImageUrl = require("../img/animation.png");
        this.loadImages(this.animationImageUrl);

        this.blockImages = [];

        this.init();
    }

    loadImages(images, callback) {
        let loader = new ImageLoader(images);
        loader.done(callback);
        loader.load();
    }

    init() {
        this.resizeCanvas();
        this.loadImages(IMAGE_URL, () => {
            for (let url of IMAGE_URL) {
                let image = new Image();
                image.src = url;
                this.blockImages.push(image);
            }

            // 새 블록을 보드 최상단 중간지점에 생성
            this.makeNewBlock(0, this.cols/2);
            this.addKeyContol();

            let rowsArray = Array(this.rows).fill();
            this.board = rowsArray.map(() => Array(this.cols).fill(0));

            this.requestId = requestAnimationFrame(this.loop.bind(this));
        });

        this.addControlButtons();
    }

    resizeCanvas() {
        let ratio = this.cols / (this.rows + 2),
            windowWidth = window.innerWidth,
            windowHeight = window.innerHeight,
            windowRatio = windowWidth / windowHeight,
            scaledWidth = 0,
            scaledHeight = 0;

        if ( ratio < windowRatio ) {
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

    dropNewBlock() {
        this.makeNewBlock(0, Math.ceil(this.cols / 2));

        if (!this.isMovable({row: 1, col: 0})) {
            alert("game over");
            cancelAnimationFrame(this.requestId);
            this.gameStatus = "gameover";
        }
    }

    loop() {
        let now = Date.now();
        if (now - this.prevTick > this.tickSize) {
            if (this.blockStopsNextTick && !this.isMovable({row: 1, col: 0})) {
                this.addBlockToBoard();
                this.dropNewBlock();
                this.removeCompleteRow();
                this.blockStopsNextTick = false;

            } else if (!this.isMovable({row: 1, col: 0})) {
                this.blockStopsNextTick = true;

            } else {
                this.blockStopsNextTick = false;
                this.moveBlock(1, 0);
            }

            this.prevTick = now;
        }

        for (let animation of this.animations) {
            animation.update();
        }

        this.render();

        if (this.gameStatus === "gameover") {
            return;
        }
        this.requestId = requestAnimationFrame(this.loop.bind(this));
    };

    addBlockToBoard() {
        for (let row = 0; row < this.block.rows; row++) {
            for (let col = 0; col < this.block.cols; col++) {
                if (this.block.shape[row][col] > 0) {
                    this.board[this.block.position.row + row][this.block.position.col + col] = this.block.color;
                }
            }
        }
    }

    isMovable(offset) {
        let block = this.block,
            newBlockPosition = {
                row: block.position.row + offset.row,
                col: block.position.col + offset.col
            };

        for (let row = 0; row < block.rows; row++) {
            for (let col = 0; col < block.cols; col++) {
                let isOutOfBoundary = !this.blockIsWithinBoundary(offset);
                let isOverlap = !isOutOfBoundary &&
                    block.shape[row][col] > 0 &&
                    this.board[newBlockPosition.row+ row][newBlockPosition.col + col] > 0;

                if (isOutOfBoundary || isOverlap) {
                    return false;
                }
            }
        }

        return true;
    }

    removeCompleteRow() {
        let removeRow = (rowIndex) => {
                this.board.splice(rowIndex, 1);
                this.board.splice(0, 0, Array(this.cols).fill(0));
            },
            rowIndex = -1,
            blockSize = this.blockSize;

        for (let row = 0; row < this.rows; row++) {
            if (this.board[row].every(value => value > 0)) {
                for (let col = 0; col < this.cols; col++) {
                    let animation = new Animation({
                        x: col * blockSize.w * 0.95,
                        y: row * blockSize.h * 0.95,
                        width: blockSize.w * 1.5,
                        height: blockSize.h * 1.5,
                        frameWidth: 64,
                        frameHeight: 64,
                        frames: 10,
                        image: this.animationImageUrl,
                        interval: 30
                    });
                    this.animations.push(animation);
                    animation.start();

                    if (col === this.cols-1) {
                        animation.done(() => {
                            removeRow(row);
                            this.animations = [];
                        });
                    }
                    this.board[row] = Array(this.cols).fill(0);
                }
            }
        }
    }

    render() {
        let color,
            blockSize = this.blockSize;
            // row, col;

        this.context.fillStyle = "#000"; //background
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 쌓인 블록을 그림
        for (let [row, rowArray] of this.board.entries()) {
            for (let [col, cell] of rowArray.entries()) {
                if (cell > 0) {
                    let image = this.blockImages[cell-1];
                    this.context.drawImage(image, col * blockSize.w, row * blockSize.h, blockSize.w, blockSize.h);
                }
            }
        }

        // 떨어지는 블록을 그림
        for (let [row, rowArray] of this.block.shape.entries()) {
            for(let [col, cell] of rowArray.entries()) {
                if (cell > 0 ) {
                    let image = this.blockImages[this.block.color-1];
                    this.context.drawImage(image,
                            (this.block.position.col + col) * blockSize.w,
                            (this.block.position.row + row)* blockSize.h,
                            blockSize.w,
                            blockSize.h);
                }
            }
        }

        for (let button of this.controlButtons) {
            button.render();
        }

        for (let animation of this.animations) {
            animation.render(this.context);
        }
    }

    addKeyContol() {
        document.body.addEventListener("keydown",  e => {
            switch(e.keyCode) {
                case 37: // left
                    e.preventDefault();
                    this.moveBlock(0, -1);
                    break;
                case 38: // up
                    e.preventDefault();
                    this.rotateBlock(false);
                    break;
                case 39: // right
                    e.preventDefault();
                    this.moveBlock(0, 1);
                    break;
                case 40: // down
                    e.preventDefault();
                    this.moveBlock(1, 0);
                    break;
                default: break;
            }
        });
    }

    makeNewBlock(row, col) {
        let randomShape = randomProperty(SHAPE),
            randomColor = Math.floor(Math.random() * IMAGE_URL.length) + 1;

        this.block = {
            color: randomColor,
            shape: randomShape,
            position: {row, col},
            rows: randomShape.length,
            cols: randomShape[0].length
        };
    }

    moveBlock(row, col) {
        if (!this.isMovable({row, col})) {
            return;
        }

        this.block.position.row += row;
        this.block.position.col += col;
    }

    rotateBlock(clockwise) {
        var oldCols = this.block.cols,
            oldRows = this.block.rows,
            oldShape = this.block.shape,
            // rotate 후에는 원래의 가로 * 세로 사이즈가 서로 뒤바뀌기 때문에.
            newShape = Array(oldCols).fill().map(() => Array(oldRows));

        for(let row = 0; row < oldCols; row++) {
            for (let col = 0; col < oldRows; col++) {
                newShape[row][col] = this.block.shape[oldRows - 1 - col][row];
            }
        }

        this.block.shape = newShape;
        this.block.rows = oldCols;
        this.block.cols = oldRows;

        if (!this.isMovable({row: 0, col: 0})) {
            this.block.shape = oldShape;
            this.block.rows = oldRows;
            this.block.cols = oldCols;
        }
    }

    blockIsWithinBoundary(offset) {
        var tempPosition = {
            row: this.block.position.row + offset.row,
            col: this.block.position.col + offset.col
        };

        return tempPosition.row >= 0 &&
            tempPosition.col >= 0 &&
            tempPosition.row + this.block.rows <= this.rows &&
            tempPosition.col + this.block.cols <= this.cols;
    }

    addControlButtons () {
        let buttonSizes = this.buttonSize,
            leftButton  = new Button({
                x: 0,
                y: this.blockSize.h * 20,
                width: buttonSizes.w,
                height: buttonSizes.h,
                img: BUTTON_IMG.left,
                canvas: this.canvas
            }), 
            downButton  = new Button({
                x: buttonSizes.w,
                y: this.blockSize.h * 20,
                width: buttonSizes.w,
                height: buttonSizes.h,
                img: BUTTON_IMG.down,
                canvas: this.canvas
            }), 
            rotateButton  = new Button({
                x: buttonSizes.w * 2,
                y: this.blockSize.h * 20,
                width: buttonSizes.w,
                height: buttonSizes.h,
                img: BUTTON_IMG.rotate,
                canvas: this.canvas
            }),
            rightButton  = new Button({
                x: buttonSizes.w * 3,
                y: this.blockSize.h * 20,
                width: buttonSizes.w,
                height: buttonSizes.h,
                img: BUTTON_IMG.right,
                canvas: this.canvas
            })

        leftButton.onTouchend(() => {
            this.moveBlock(0, -1);
        });
        rightButton.onTouchend(() => {
            this.moveBlock(0, 1);
        });
        rotateButton.onTouchend(() => {
            this.rotateBlock();
        });
        downButton.onTouchend(() => {
            this.moveBlock(1, 0);
        });

        this.controlButtons.push(leftButton);
        this.controlButtons.push(rightButton);
        this.controlButtons.push(rotateButton);
        this.controlButtons.push(downButton);
    }
}

class Button {
    constructor (props) {
        this._callback = () => {};
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

    init () {
        this.canvas.addEventListener( "touchend", ( e ) => {
            const touchX = e.changedTouches[0].clientX,
                touchY = e.changedTouches[0].clientY; 

            if (touchX > this.x && touchX < this.x + this.width &&
                touchY > this.y && touchY < this.y + this.height) {
                this._callback();
            }
        });
        const loader = new ImageLoader(this.imageUrl);        
        loader.done(() => {
            this.image = new Image();
            this.image.src = this.imageUrl;
        });
        loader.load();
    }

    render (context) {
        if (this.image) {
            this.context.drawImage(this.image, this.x, this.y, this.width, this.height);
        }
    }

    onTouchend ( callback ) {
        this._callback = callback;
    }

    off () {
        this._callback = () => {};
    }

}
