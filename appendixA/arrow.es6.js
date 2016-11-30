// 매개변수가 하나인 경우에는 괄호 생략 가능
// 반환되는 객체를 곧바로 사용 가능(return 생략)
const f1 = a => a+1;
console.log( f1(1) );

// 반환할 객체가 아닌 {구문}을 사용하는 경우
const f2 = (a) => { return a+1 };
console.log( f2(1) );

// 기존 익명함수보다 짧은 형식으로 사용이 가능
const a = [ 1, 2, 3, 4, 5 ];
const b = a.map( v => v+1 );
console.log( b );

// lexical this
function Player() {
    this.level = 1;
    setInterval( ()=>{
        this.level+=1;
    }, 1000);
}
const p = new Player();
setTimeout( ()=>{ console.log(p) }, 2000);