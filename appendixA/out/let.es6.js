"use strict";

// let, const

// 재정의 테스트
var a = 0;
var a = 1; // 재정의 가능
var b = 0;
//let b = 1; // 재정의 불가 - Duplicate declaration "b"
var c = 0;
//const c = 1; // 재정의 불가 - Duplicate declaration "c"

// 재할당 테스트
a = 2;
b = 2;
//c=2; // const는 재할당 불가 : "c" is read-only

// block scope 테스트
{
    var a = 3;
    var _b = 3;
    var _c = 3;
    console.log(a, _b, _c); // 3 3 3
}

console.log(a, b, c); // 3 2 0