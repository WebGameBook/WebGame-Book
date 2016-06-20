var GameManager = function (size, container) {
    this.size = size;
    this.key = "puzzleData";
    this.grid = new GridManager(size);
    this.acture = new Acture();
    this.container = container;
    this.localStorage = new LocalStorageManager();
    this.puzzleSize = {
        width:45,
        height:45,
        margin:1
    };
};

GameManager.prototype.init = function () {

    var data = {};

    //init grid data
    data["grid"] = this.grid.init();
    data["size"] = this.size;
    data["gameover"] = false;
    this.localStorage.save(this.key,data);

    this.resizeContainer();
    //default map draw & default puzzle setting 
    this.draw();
    this.start();
};

GameManager.prototype.start = function () {

    //suffle
    this.acture.suffle();
};

GameManager.prototype.draw = function () {

    this.grid.makeMap();
    this.grid.drawPuzzle(this.key,this.size);
};

GameManager.prototype.resizeContainer = function () {

    this.container.css("width",(this.puzzleSize.width * this.size) + (this.puzzleSize.margin*6) + "px");
    this.container.css("height",(this.puzzleSize.height * this.size)+(this.puzzleSize.margin*6) + "px");

};
