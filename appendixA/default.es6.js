// default parameter
function add(a, b=1) {
    console.log( a + b );
}
add(1,2); //3
add(1); //2
add(1,null); //1
add(1,undefined); //2

// arrow function
const addOne = (a=1) => { return a+1 };
console.log( addOne() ); // 2

// rest
function testRest(...args) {
    // args는 배열
    console.log(args, args.length);
}
testRest(1,2,3); // [1,2,3] 3
testRest(1); // [1] 1
testRest(); // [] 0

// 두번째 인수부터 나머지 인수들을 rest로 받음.
function addRest(a, ...rest) {
    console.log(a, rest);
}
addRest(1,2,3);
addRest(1);
addRest();

// spread
// 전개 연산자
const params = [10,20];
add(...params);
// 배열 리터럴에 적용 가능
console.log( [ 1, 2, ...params, 30 ] );
