/* class는 interface를 구현할(따를)수 있다. */
interface I1 {
  readonly a: string;
  b: string;
}
class C1 implements I1 {
  readonly a: string = "123";
  b: string = "ww";
  c: string = "wow"; // public

  method() {
    console.log(this.a);
  }
}

class C2 extends C1 {
  method() {
    console.log(this.b);
  }
}

/* class 추상화 */
// 추상부 (추상적인 것만 아니라 실제 값도 가질 수 있음)
abstract class AbsC {
  private readonly a: string = "a";
  b: string = "b";

  abstract method(): void;
  method2() {
    return 3;
  }
}
// 구현부 (abstract로 지정된 것은 반드시 구현해주어야 함)
class imC extends AbsC {
  method() {
    console.log(this.b);
  }
}

/* optional */
function func_otnl(a: number, b?: number, c?: number) {}
func_otnl(1, 2);

let var_otnl: { a: string; b?: string } = {
  a: "a",
};

/* generic */
// 타입 결정을 실제 사용때까지 T라는 임의의 변수로 보류함
// 아무런 타입이나 가능
function fgen<T>(x: T, y: T): T {
  return x;
}
fgen("1", "2"); // 여기서 결정
fgen(1, 2); // 여기서 결정

// 여러개의 제네릭 변수 사용
function fgen3<T1 extends string, T2 extends number>(x: T1, y: T2): T1 {
  return x;
}

// 타입 강제 지정 vs 제네릭 타입 지정 (위치 헷갈리지 말기)
fgen<number>(1, 2); // 제네릭 타입 지정
<number>fgen(1, 2); // 타입 강제 지정

/* generic 타입 결정에 제한 걸기 (extends) */
// 타입 부분 제한
function fgen2<T extends string | number>(x: T, y: T): T {
  return x;
}
// 특정 함수로 제한
function fgen4<T extends (a: string) => number>(x: T): T {
  return x;
}
fgen4((a) => +a);
// 모든 함수로 제한
function fgen6<T extends (...args: any) => any>(x: T): T {
  return x;
}
fgen6((a) => a + 1);
// 생성자로 제한
function fgen5<T extends abstract new (...args: any) => any>(x: T): T {
  return x;
}
class C3 {
  constructor() {}
}
fgen5(C3); // class도 생성자이므로.

/* declare: 남이 만든 코드에 type설정(typing)할 때 사용. */

/* */
/* */
/* */
/* */
/* */
/* */
