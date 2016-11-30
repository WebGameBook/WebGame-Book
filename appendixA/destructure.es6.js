// 배열의 비구조화 할당 : 파이썬 튜플과 매우 유사

// 선언 시 할당
let list = [1,2,3];
let [a,b,c] = list;
console.log( a, b, c ); // 1 2 3

// 선언 이후 할당
let x,y;
[x,y] = [1,2];
console.log(x, y); // 1 2

// swap
[x,y] = [y,x];
console.log(x, y); // 2 1

// 함수 반환 값에 활용하기
function testDestructure() {
    return [1,2,3];
}
let [r1, r2, r3] = testDestructure();
console.log(r1, r2, r3); // 1 2 3
let [e1, e2] = testDestructure(); // 일부값을 무시
console.log(e1, e2); // 1 2
let [w1, ,w3] = testDestructure(); // 일부값을 무시
console.log(w1, w3); // 1 3

// 객체의 비구조화
let obj = {name:"john", age:20};
let {name, age} = obj;
console.log( name, age ); // john 20

// 새로운 변수 할당
let {name:tag, age:cnt} = obj;
console.log( tag, cnt ); // john 20

// 기본값 설정
let {id=0, address="unknown"} = {id:1};
console.log( id, address ); // 1 unknown

