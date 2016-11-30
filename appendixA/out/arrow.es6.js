"use strict";

// 매개변수가 하나인 경우에는 괄호 생략 가능
// 반환되는 객체를 곧바로 사용 가능(return 생략)
var f1 = function f1(a) {
    return a + 1;
};
console.log(f1(1));

// 반환할 객체가 아닌 {구문}을 사용하는 경우
var f2 = function f2(a) {
    return a + 1;
};
console.log(f2(1));

// 기존 익명함수보다 짧은 형식으로 사용이 가능
var a = [1, 2, 3, 4, 5];
var b = a.map(function (v) {
    return v + 1;
});
console.log(b);

// lexical this
function Player() {
    var _this = this;

    this.level = 1;
    setInterval(function () {
        _this.level += 1;
    }, 1000);
}
var p = new Player();
setTimeout(function () {
    console.log(p);
}, 2000);