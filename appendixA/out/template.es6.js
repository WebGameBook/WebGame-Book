"use strict";

var _templateObject = _taggedTemplateLiteral(["a+b is ", " and a = ", ""], ["a+b is ", " and a = ", ""]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

// 기존 multi-line 사용법
console.log("line1\n" + "line2");

// es2015
console.log("line1\nline2");

// template string
var a = 1,
    b = 2;
console.log("a+b=${a+b}");
console.log("a+b=" + (a + b));

// tagged template literals
function tag(strings) {
    for (var _len = arguments.length, values = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        values[_key - 1] = arguments[_key];
    }

    console.log(strings, values); // [ 'a+b is ', ' and a = ', '' ] [ 3, 1 ]
}
tag(_templateObject, a + b, a);