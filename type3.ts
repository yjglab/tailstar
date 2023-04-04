/* 공변성/반공변성: 함수간에 서로 대입이 가능한지 */

function fn(x: string): number {
  return +x;
}
fn("1"); // 1

// 리턴값은 더 넓은 타입으로는 대입할 수 있다
type t1 = (x: string) => number | string;
const tst1: t1 = fn; // fn보다 t1이 더 넓은 타입

// 매개변수는 더 좁은 타입으로도 대입 가능
type t2 = (x: string) => number;
const tst2: t2 = fn; // fn보다 t2가 더 좁은 타입

// 함수 오버로딩
declare function add(x: number, y: number, z?: number): number;
declare function add(x: string, y: string): string;
add(1, 2);
add("1", "2");

// ts는 건망증이 심하다
interface Axios {
  get(): void;
}

class CustomError extends Error {
  response?: {
    data: any;
  };
}

declare const axios: Axios;
(async () => {
  try {
    await axios.get();
  } catch (error) {
    // interface는 타입가드로 쓸 수 없으므로 클래스로 사용
    if (error instanceof CustomError) {
      console.error(error.response?.data);
      error.response?.data;
    }
  }
})();

/[ Utility types ]/;
interface Profile {
  name: string;
  age: number;
  married: boolean;
}

const person1: Profile = {
  name: "james",
  age: 22,
  married: false,
};
const person2: Partial<Profile> = {
  // Partial을 사용하면 대상의 모든 속성을 optional(.?)로 변경 (좋은 기능은 아님. 거의 사용X -> Pick, Omit 많이 사용)
  name: "cack",
  age: 22,
};

type makePartial<T> = {
  [Key in keyof T]?: T[Key];
};
const person3: makePartial<Profile> = {
  name: "cack",
  age: 22,
};

// Pick: 선택한 속성만
const person4: Pick<Profile, "name" | "age"> = {
  name: "cack",
  age: 22,
};
// Omit: 선택한 속성만 제외
const person5: Omit<Profile, "married"> = {
  name: "cack",
  age: 22,
};

// Pick 구현하기
type makePick<T, S extends keyof T> = {
  [Key in S]: T[Key];
};
const person6: makePick<Profile, "name" | "age"> = {
  name: "cack",
  age: 22,
};

// Omit 구현하기 (Exclude: Exclude<T, S> => T에서 S제거한 나머지)
type makeOmit<T, S extends keyof any> = Pick<T, Exclude<keyof T, S>>;
const person7: makeOmit<Profile, "married"> = {
  name: "cack",
  age: 22,
};

//
interface Profile2 {
  name?: string;
  age?: number;
  married?: boolean;
}
/* Required */
const person8: Required<Profile2> = {
  // name, age, married 필수
  name: "james",
  age: 22,
  married: false,
};
type makeRequired<T> = {
  // -, +: modifier 연산자
  [Key in keyof T]-?: T[Key]; // Key in keyof T 에서 optional(?)을 모두 제거(-)한다.
};
const person9: makeRequired<Profile2> = {
  // name, age, married 필수
  name: "james",
  age: 22,
  married: false,
};

/* Readonly: 수정 불가능 하도록 */
const person10: Readonly<Profile2> = {
  name: "james",
  age: 22,
  married: false,
};
type makeReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

/* Record: 객체를 표현하는 한가지 방법 */
interface Obj1 {
  [key: string]: number;
}
// Obj1 interface를 Record로 간단히 표현
const obj: Record<string, number> = {
  a: 3,
  b: 2,
};
type makeRecord<T extends keyof any, S> = {
  [Key in T]: S;
};
const obj2: makeRecord<string, number> = {
  a: 3,
};

/* NonNullable: null과 undefined 제외 */
type nont = string | null | undefined | boolean | number;
type nont2 = NonNullable<nont>;

// 정리: Exclude, Extract, NonNullable => 객체의 Key들에 적용 가능
// 정리: Partial, Required, Readonly, Pick, Omit 등 => interface에 적용 가능

/[ infer: 추론한다 ]/;
function zip(
  x: number,
  y: string,
  z: boolean
): { x: number; y: string; z: boolean } {
  return { x, y, z };
}
/* Parameters<>: 매개변수 타입만 가져옴 */
type Params = Parameters<typeof zip>;
type First = Params[0]; // number

// 여기서 T는 함수로 제한.
type makeParameters<T extends (...args: any) => any> = T extends (
  ...args: infer A
) => any
  ? A
  : never; // A(매개변수 자리)를 추론해서 추론 값이 있으면 A를 쓰고 없으면 never

/* ReturnType<>: 리턴 타입만 가져옴 */
type Rets = ReturnType<typeof zip>;
type makeReturnType<T extends (...args: any) => any> = T extends (
  ...args: any
) => infer A
  ? A
  : never; // A(매개변수 자리)를 추론해서 추론 값이 있으면 A를 쓰고 없으면 never

//
class Cls1 {
  a: string;
  b: number;
  c: boolean;
  constructor(a: string, b: number, c: boolean) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}
const c1 = new Cls1("A", 123, true);
/* ConstructorParameters<>: 생성자 타입 가져오기 */
type CP = ConstructorParameters<typeof Cls1>;
/* InstanceType<>: 인스턴스 타입 가져오기 */
type IT = InstanceType<typeof Cls1>;

const a: Cls1 = new Cls1("BB", 456, false); // 인스턴스(new)

// 변수명을 사용하고 싶은데 이미 선언되어 충돌되는 경우 namespace 사용
declare namespace Myspace {
  const alreadyDeclared: string;
}
Myspace.alreadyDeclared;

export {};
