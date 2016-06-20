var Acture = function (localStorageManager,key) {
    this.localStorage = localStorageManager;
    this.localStorageKey = key;
};

Acture.prototype.move = function (puzzle,grid) {

    var self = this,
        puzzle = puzzle,
        grid = grid,
        className = puzzle.attr('class'),
        direction = -1;

    window.requestAnimationFrame(function () {
        //puzzle의 현재 class로 위치를 확인, 현재위치를 previous로 저장
        
        var x = className.split("-")[1],
            y = className.split("-")[2],
            previous = {
                position : {
                    x: x,
                    y: y
                }
            },
            moved = {
                position : {
                    x:0,
                    y:0
                }
            },
            direction = this.findDirection(grid,previous),
            previousState,
            movedClass = null;
        
        if (direction !== -1) {
            grid[x][y]["previous"] = previous;
            //좌우상하를 확인해서 null인 곳을 direction으로 잡아서 이동
            movedClass = this.positionClass(previous,direction);
            moved.position.x = movedClass.split('-')[1];
            moved.position.y = movedClass.split('-')[2];
            //grid상태 업데이트
            previousState = grid[previous.position.x][previous.position.y]
            moved.value = previousState.value;
            moved.previous = previous;
            //grid 저장
            grid[moved.position.x][moved.position.y] = moved;
            this.localStorage.save(localStorageKey,grid);

            //이동
            puzzle.addClass(movedClass);
            $('.'+movedClass).removeClass("puzzle-"+x+"-"+y);

        }
        
    });

};

Acture.prototype.suffle = function (grid) {
    console.log(grid);
    var size = grid.length;
    var direction = -1;
    //grid에서 상하좌우중 null을 가진 puzzle을 찾음
    //해당 puzzle을 null방향으로 이동시킴
    //이 로직을 여러번 반복한다면?
    for (var i = 0 ; i < size; i++) {
        for (var j = 0 ; j < size; j++) {
            direction = this.findDirection(grid,{
                position:{
                    x:i,
                    y:j
                }
            });

            this.move($('.puzzle-'+i+"-"+j),grid);
        }
    }
};

Acture.prototype.normalizePosition = function (previous, direction) {

    /**
     * direction
     *  1 : up
     *  2 : right 
     *  3 : down
     *  4 : left
     */
    switch(direction) {
        case 1 : 
            position.y = position.y-1;
            break;
        case 2 :
            position.x = position.x+1;
            break;
        case 3 :
            position.y = position.y+1;
            break;
        case 4 :
            position.x = position.x -1;
            break;
       default :
            break;     

    }

    return position;
};

Acture.prototype.positionClass = function (previous,direction) {
    var previousPosition = previous;
    var pos = this.normalizePosition(previousPosition,direction);

    return "puzzle-"+pos.x+"-"+pos.y;
};

Acture.prototype.findDirection = function (g,p) {

    var d = -1;

    if (g[p["position"].x+1][p["position"].y] == null) {
        //right
        d =2;
    } else if (g[p["position"].x-1][p["position"].y] == null) {
        //left
        d =4;
    } else if (g[p["position"].x][p["position"].y+1] == null) {
        //down
        d =3;
    } else if (g[p["position"].x+1][p["position"].y -1] == null) {
        //up
        d =1;
    }

    return d;
};

