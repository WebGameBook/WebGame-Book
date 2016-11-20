
const STATUS = {
    PENDING: 1,
    RUNNING: 2,
    STOPPED: 3
};

export default class Animation {

    constructor (option) {
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

    update () {
        if (this.status !== STATUS.RUNNING) {
            return;
        }

        let now = new Date();
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

    _stop () {
        this.status = STATUS.STOPPED;
        this._callback();
    }

    start () {
        this._lastUpdate = new Date();
        this.status = STATUS.RUNNING;
    }

    done (callback) {
        this._callback = callback;
    }

    render (context) {
        if (this.status !== STATUS.RUNNING) {
            return;
        }

        let sx = this.frameSize.width * this._currentFrame,
            sy = 0,
            sw = this.frameSize.width,
            sh = this.frameSize.height,
            dx = this.position.x,
            dy = this.position.y,
            dw = this.size.width,
            dh = this.size.height;

        context.drawImage(this._image, sx, sy, sw, sh, dx, dy, dw, dh);
    }
}