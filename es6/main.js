//严格模式
'use strict';
console.log(__dirname);
console.log(__filename);
//新的变量定义
const d = '123';
global.d = "hello es6";
this.d = '456';
let h = '123';
// console.log(global.d);
// console.log(this.d);
// console.log(d);
//解构
var [s = true] = [];
var [a1 ,b1] = [0,1];
// console.log(a1,b1);
var { a ,b } = {
    a : 1,
    b : 2
};
var foo = 'bar';
var baz = { [foo]: 'abc'};
let propKey = 'foo';
let obj1 = {//变量作为obj的key
    [propKey]: true,
    ['a' + 'bc']: 123
};
let obj = {
    ['h'+'ello']() {
      return 'hi';
    }
};
obj.hello() // hi
// console.log(a,b);
var { foo: baz } = { foo: 'aaa', bar: 'bbb' };
// console.log(baz);

//of遍历
let str = "abc";
for(let s of str){
    // console.log(s);//a b c
}

for(let s in str){
    // console.log(s);//0 1 2
}

let arr = ['a','b','c'];
for(let s of arr){
    // console.log(s);//a b c
}

for(let s in arr){
    // console.log(s);//0 1 2
}
//字符串操作
let str2 = "hello es6";
// console.log(str2.startsWith('he'));//true
// console.log(str2.endsWith('s6'));//true
// console.log(str2.includes('o e'));//true
// console.log(str2.repeat(2));//"hello es6hello es6"
let str3 = `Hello ${str}, 
how are you ${str2}?`;
// console.log(str3);

let str4 = (`Hello ${str},
how are you ${str2}?`).trim();
// console.log(str4);

//数值操作
Number.isFinite(15); // true
Number.isFinite(0.8); // true
Number.isFinite(NaN); // false
Number.isFinite(Infinity); // false
Number.isFinite(-Infinity); // false
Number.isFinite('foo'); // false
Number.isFinite('15'); // false
Number.isFinite(true); // false
Number.isNaN(NaN) // true
Number.isNaN(15) // false
Number.isNaN('15') // false
Number.isNaN(true) // false
Number.isNaN(9/NaN) // true
Number.isNaN('true'/0) // true
Number.isNaN('true'/'true') // true
Number.parseInt('12.34') // 12
Number.parseFloat('123.45#') // 123.45
Number.isInteger(25) // true
Number.isInteger(25.0) // true
Number.isInteger(25.1) // false
Number.isInteger("15") // false
Number.isInteger(true) // false
Number.EPSILON// 2.220446049250313e-16 极小的常量,用于浮点数计算的误差值判断
Number.EPSILON.toFixed(20)// '0.00000000000000022204'
Number.MAX_SAFE_INTEGER//Math.pow(2, 53) - 1    [9007199254740991]
Number.MIN_SAFE_INTEGER//-Number.MAX_SAFE_INTEGER
Number.isSafeInteger('a') // false
Number.isSafeInteger(null) // false
Number.isSafeInteger(NaN) // false
Number.isSafeInteger(Infinity) // false
Number.isSafeInteger(-Infinity) // false
Number.isSafeInteger(3) // true
Number.isSafeInteger(1.2) // false
Number.isSafeInteger(9007199254740990) // true
Number.isSafeInteger(9007199254740992) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER - 1) // false
Number.isSafeInteger(Number.MIN_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER) // true
Number.isSafeInteger(Number.MAX_SAFE_INTEGER + 1) // false
Math.trunc(4.9) // 4 向下取整
Math.trunc(-4.9) // -4
Math.trunc(-0.1234) // -0
Math.trunc('123.456')// 123
Math.trunc(NaN); // NaN
Math.trunc('foo'); // NaN
Math.trunc();// NaN
2 ** 2 // 4
2 ** 3 // 8
let a3 = 2;
a3 **= 3;
// console.log(a3);

//数组操作
let arrayLike = {
    '0': 'a',
    '1': 'b',
    '2': 'c',
    length: 3
};
// ES5的写法
var arr3 = [].slice.call(arrayLike); // ['a', 'b', 'c']
// ES6的写法
let arr2 = Array.from(arrayLike); // ['a', 'b', 'c']
Array.of(3, 11, 8) // [3,11,8]
Array.of(3) // [3]
Array.of(3).length // 1
//遍历
for (let index of arr.keys()) {
    // console.log(index);//0 1
}
for (let elem of arr) {
    // console.log(elem);//'a b
}
for (let [index, elem] of arr.entries()) {
    // console.log(index, elem);//0,a 1,b
}
[1, 2, 3].includes(2);     // true
[1, 2, 3].includes(4);     // false
[1, 2, NaN].includes(NaN); // true
//数组合并
var arr4 = [0, 1, 2];
var arr5 = [3, 4, 5];
[...arr4,...arr5];//0,1,2,3,4,5
arr4.push(...arr5);//0,1,2,3,4,5
// ES5
// a = list[0], rest = list.slice(1)
// ES6
// [a, ...rest] = list;


//函数
var Point = function(x = 0, y = 0){
    this.x = x;
    this.y = y;
};
var p = new Point();// { x: 0, y: 0 }
// console.log(p);
//箭头函数里面根本没有自己的this，而是引用外层的this
//箭头函数不能作为构造函数
//箭头函数没有自己的this 用的上层的this
//箭头函数没有arguments对象，用的上层的arguments

function fetch(url, { method = 'GET' } = {}) {//双重默认值
    return method;
}
fetch('http://example.com');//GET
// (function (a, b, c = 5) {}).length() // 2  【未设置默认值得参数个数】
// //如果设置了默认值的参数不是尾参数，那么length属性也不再计入后面的参数了。
// (function (a = 0, b, c) {}).length // 0
// (function (a, b = 1, c) {}).length // 1
//不定参数个数
function add(...values) {//values后面不能再跟参数
    let sum = 0;
    for (let val of values) {
      sum += val;
    }
    return sum;
}
add(2, 5, 3) // 10

Math.max(...[14, 3, 77])
// 等同于
Math.max(14, 3, 77);

var go = function*(){
    yield 1;
    yield 2;
    yield 3;
};
[...go()] // [1, 2, 3]

var func1 = function () {};
// ES5
func1.name // ""
// ES6
func1.name // "func1"

