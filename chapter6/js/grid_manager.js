var GridManager = function (size) {
    this.size = size;
    this.localStorage = new LocalStorageManager();
};

GridManager.prototype.init = function () {
    
    //null로 이루어진 그리드 생성
    var grid = this.makeGrid();
    var size = this.size;
    var counter = 1;
    //마지막 1칸을 비우고 모두 값을 채움
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            
            grid[i][j] = (i === size-1 && j === size-1) ? null : {position:{x:i,y:j},value:counter};
            counter++;
        }
    }

    return grid;
};

GridManager.prototype.makeGrid = function () {

    var size = this.size;
    var grid = new Array(size);

    //그리드 공간생성
    for (var index = 0; index < size; index++) {
        grid[index] = new Array(size);
    }

    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            grid[i][j] = null;
        }
    }

    return grid;
};

GridManager.prototype.makeMap = function () {

    var size = this.size;

    for (var i = 0 ; i < size; i++ ) {
         $('.game-container').append("<div class='row'></div>");
         for (var j = 0; j < size; j++) {
            $($('.game-container .row')[i]).append("<div class='cell'></div>");
         }
    }
}

GridManager.prototype.drawPuzzle = function (key,size) {

    var grid = this.localStorage.load(key).grid;
    console.log(grid);
    console.log(JSON.stringify(this.localStorage.load(key)));
    for (var i = 0; i < size; i++) {
        for (var j = 0; j < size; j++) {
            console.log(grid[i][j]);
            if (grid[i][j] != null) {
                console.log();

                
                $($($('.game-container .row')[i]).find('.cell')[j]).append("<div class='actor puzzle-'"+i+"-"+j+"'>"+grid[i][j].value+"</div>");
                $($($('.game-container .row')[i]).find('.cell')[j]).css("width","45px");
                $($($('.game-container .row')[i]).find('.cell')[j]).css("height","45px");
            }
        }
    }

};

GridManager.prototype.saveGrid = function () {

};

GridManager.prototype.insertPuzzle = function () {

};

GridManager.prototype.checkAvailable = function () {

};

GridManager.prototype.loadGrid = function () {

};

