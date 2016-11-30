// 기존 multi-line 사용법
console.log("line1\n"+
    "line2");

// es2015
console.log(`line1
line2`);

// template string
const a=1, b=2;
console.log("a+b=${a+b}");
console.log(`a+b=${a+b}`);

// tagged template literals
function tag(strings, ...values) {
    console.log(strings, values); // [ 'a+b is ', ' and a = ', '' ] [ 3, 1 ]
}
tag`a+b is ${a+b} and a = ${a}`;