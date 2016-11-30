"use strict";

// default parameter
function add(a) {
    var b = arguments.length <= 1 || arguments[1] === undefined ? 1 : arguments[1];

    console.log(a + b);
}
add(1, 2); //3
add(1); //2
add(1, null); //1
add(1, undefined); //2

// arrow function
var addOne = function addOne() {
    var a = arguments.length <= 0 || arguments[0] === undefined ? 1 : arguments[0];
    return a + 1;
};
console.log(addOne()); // 2

// rest
function testRest() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
    }

    // args는 배열
    console.log(args, args.length);
}
testRest(1, 2, 3); // [1,2,3] 3
testRest(1); // [1] 1
testRest(); // [] 0

// 두번째 인수부터 나머지 인수들을 rest로 받음.
function addRest(a) {
    for (var _len2 = arguments.length, rest = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        rest[_key2 - 1] = arguments[_key2];
    }

    console.log(a, rest);
}
addRest(1, 2, 3);
addRest(1);
addRest();

// spread
// 전개 연산자
var params = [10, 20];
add.apply(undefined, params);
// 배열 리터럴에 적용 가능
console.log([1, 2].concat(params, [30]));