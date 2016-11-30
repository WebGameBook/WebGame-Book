"use strict";

var _o;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// 객체 초기자
var name = "John",
    age = 20;
var o1 = { name: name, age: age };
console.log(o1); // { name: 'John', age: 20 }

// 객체 내 함수 정의
var o2 = {
    a: 1,
    f: function f() {
        console.log("function");
    }
};
o2.f(); // function

// 속성계산명
var i = 1;
var o3 = (_o = {}, _defineProperty(_o, "address" + i++, "somewhere"), _defineProperty(_o, "address" + i++, "somewhere"), _o);
console.log(o3); // { address1: 'somewhere', address2: 'somewhere' }