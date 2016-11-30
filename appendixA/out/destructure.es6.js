"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

// 배열의 비구조화 할당 : 파이썬 튜플과 매우 유사

// 선언 시 할당
var list = [1, 2, 3];
var a = list[0];
var b = list[1];
var c = list[2];

console.log(a, b, c); // 1 2 3

// 선언 이후 할당
var x = void 0,
    y = void 0;
x = 1;
y = 2;

console.log(x, y); // 1 2

// swap
var _ref = [y, x];
x = _ref[0];
y = _ref[1];

console.log(x, y); // 2 1

// 함수 반환 값에 활용하기
function testDestructure() {
    return [1, 2, 3];
}

var _testDestructure = testDestructure();

var _testDestructure2 = _slicedToArray(_testDestructure, 3);

var r1 = _testDestructure2[0];
var r2 = _testDestructure2[1];
var r3 = _testDestructure2[2];

console.log(r1, r2, r3); // 1 2 3

var _testDestructure3 = testDestructure();

var _testDestructure4 = _slicedToArray(_testDestructure3, 2);

var e1 = _testDestructure4[0];
var e2 = _testDestructure4[1]; // 일부값을 무시

console.log(e1, e2); // 1 2

var _testDestructure5 = testDestructure();

var _testDestructure6 = _slicedToArray(_testDestructure5, 3);

var w1 = _testDestructure6[0];
var w3 = _testDestructure6[2]; // 일부값을 무시

console.log(w1, w3); // 1 3

// 객체의 비구조화
var obj = { name: "john", age: 20 };
var name = obj.name;
var age = obj.age;

console.log(name, age); // john 20

// 새로운 변수 할당
var tag = obj.name;
var cnt = obj.age;

console.log(tag, cnt); // john 20

// 기본값 설정
var _id = { id: 1 };
var _id$id = _id.id;
var id = _id$id === undefined ? 0 : _id$id;
var _id$address = _id.address;
var address = _id$address === undefined ? "unknown" : _id$address;

console.log(id, address); // 1 unknown