// 객체 초기자
const name="John", age=20;
const o1 = {name, age};
console.log(o1); // { name: 'John', age: 20 }

// 객체 내 함수 정의
const o2 = {
    a:1,
    f(){
        console.log("function");
    }
};
o2.f(); // function

// 속성계산명
let i=1;
const o3 = {
    ["address"+i++] : "somewhere",
    ["address"+i++] : "somewhere"
};
console.log(o3); // { address1: 'somewhere', address2: 'somewhere' }