"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// hoisting이 일어나지 않음.
// TypeError: undefined is not a function
//const baby = Person(1);

var Person = function () {
    // 생성자

    function Person(age) {
        _classCallCheck(this, Person);

        this.age = age;
    }
    // class method


    _createClass(Person, [{
        key: "walk",
        value: function walk() {
            console.log("walking...");
        }
        // static method

    }], [{
        key: "print",
        value: function print(one) {
            console.log("age:", one.age);
        }
    }]);

    return Person;
}();

var p = new Person(10);
p.walk();

Person.print(p);

// class 상속

var Man = function (_Person) {
    _inherits(Man, _Person);

    function Man() {
        _classCallCheck(this, Man);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Man).apply(this, arguments));
    }

    _createClass(Man, [{
        key: "walk",
        value: function walk() {
            console.log("man walking...");
            _get(Object.getPrototypeOf(Man.prototype), "walk", this).call(this); // 부모 method 호출.
        }
    }]);

    return Man;
}(Person);

var m = new Man(20);
m.walk();

// type check : 실제로는 함수.
console.log(typeof Person === "undefined" ? "undefined" : _typeof(Person)); // function
// 실제로는 함수이므로 prototype을 사용할수도 있음.
Person.prototype.sit = function () {
    console.log("sit");
};
p.sit();