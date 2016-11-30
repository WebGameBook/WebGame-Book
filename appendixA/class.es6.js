// hoisting이 일어나지 않음.
// TypeError: undefined is not a function
//const baby = Person(1);

class Person {
    // 생성자
    constructor(age) {
        this.age = age;
    }
    // class method
    walk() {
        console.log( "walking...");
    }
    // static method
    static print(one) {
        console.log( "age:", one.age );
    }
}

const p = new Person(10);
p.walk();

Person.print(p);

// class 상속
class Man extends Person {
    walk() {
        console.log( "man walking...");
        super.walk(); // 부모 method 호출.
    }
}
const m = new Man(20);
m.walk();

// type check : 실제로는 함수.
console.log( typeof(Person) ); // function
// 실제로는 함수이므로 prototype을 사용할수도 있음.
Person.prototype.sit = function() {
    console.log("sit");
};
p.sit();