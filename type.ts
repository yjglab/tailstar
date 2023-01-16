let a: number = 5;
let b: string = "1";
const c: boolean = true; // const인데 타입이 boolean일 필요가 있을까?
const d: undefined = undefined;
const e: null = null;
const f: any = 111;
const g: true = true; // 고정값
const h: 5 = 5; // 고정값

// const로 변수를 만든다 -> 고정값이므로 ts가 추론해주는 타입으로 그대로 사용하면 된다.
// (굳이 타입을 명시할 필요가 없다)
const ex1 = 5;
const ex2 = "str";
const ex3 = false;

let aaa = 123;
aaa = "hi" as unknown as number;

// 함수
function add1(x: number, y: number): number {
  return x + y;
}
function add1_ts(x: number, y: number) {
  return x + y; // return값을 ts가 자동으로 추론한다. (타입 명시 불필요)
}

type add2_1_type = (x: number, y: number) => number; // type: 간단한 정의
const add2_1: add2_1_type = (x, y) => {
  return x + y;
};

const add2_2: (x: number, y: number) => number = (x, y) => {
  return x + y;
};

interface add3_itf {
  // interface: 체계적, 객체지향 설계위함
  (x: number, y: number): number;
}
const add3: add3_itf = (x, y) => x + y;

// 객체
const obj: { a: number; b: number } = {
  a: 1,
  b: 2,
};
const arr1: string[] = ["aa", "bb", "cc"];
const arr2: Array<string> = ["aa", "bb", "cc"]; // <> : generic
const tuple: [number, string, number] = [1, "2", 3]; // 고정 길이 배열

const obj2 = {
  a: 1,
  b: 2,
} as const; // 더 엄격한 타입 추론

//
const head: Element = document.querySelector("head")!; // head라는 태그는 반드시 존재함을 명시. null이 될 수 없음을 명시함. (권장하지않음)
//
function rest(a: string, ...args: string[]) {
  console.log(a, args); // "1", ["2", "3"]
}
rest("1", "2", "3");

// enum (잘 사용하지 않음)
const enum dir {
  Up = 2, // 2
  Down, // 3
  Left, // 4
  Right, // 5
}
// typeof: 선언한 객체에서 타입만 뽑아서 쓸 경우
// keyof: 선언한 객체에서 키만 뽑아서 쓸 경우
const obj3 = { a: 1, b: "2", c: "3" } as const;
type t1 = keyof typeof obj3; // obj3의 key값.
type t2 = typeof obj3[keyof typeof obj3]; // obj3의 value들의 type만.

// type 간단한 타입 정의
type type1 = { a: "a" } & { b: "b" }; // intersection. 모든 속성이 다 있어야 함
const obj4: type1 = {
  a: "a",
  b: "b",
};
type type2 = { a: "a" } | { b: "b" }; // union. 모든 속성 중 하나만 있어도 됨
const obj5: type2 = {
  a: "a",
};
type Animal = { breath: true };
type Mammal = Animal & { breed: true };
type Human = Mammal & { think: true };
const jk: Human = { breath: true, breed: true, think: true };

// interface 체계적, 객체지향 설계위함
interface Animal_i {
  breath: true;
}
interface Mammal_i extends Animal_i {
  breed: true;
}
interface Human_i extends Mammal_i {
  think: true;
}
const jk2: Human_i = { breath: true, breed: true, think: true };

// interface는 결합이 가능하다
interface Itf {
  func1: () => void;
}
interface Itf {
  func2: () => void;
}
interface Itf {
  func3: () => void;
}
const obj6: Itf = { func1() {}, func2() {}, func3() {} };
