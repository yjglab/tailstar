// jQuery처럼 타입이 따로 필요한 라이브러리는 jquery와 @types/... 버전이 동일해야함

$("p").removeClass("myClass noClass").addClass("yourClass");
$(["p", "t"]).text("hello");
const tag = $("ul li").addClass(function (index) {
  return "item-" + index;
});
$(tag).html(function (i: number) {
  console.log(this);
  return $(this).data("name") + "입니다";
});

// TS 매개변수에서 첫번째 인자가 this인경우, 여기서 this는 this를 타입 정의해준 것이고 실제 인자는 두번째 인자부터 시작.
// 예시; removeClass(className_function?: JQuery.TypeOrArray<string> | ((this: TElement, index: number, className: string) => string)): this;
const $w = $("w");
$w.removeClass((index: number, className: string) => {
  return "myClass";
});

// text(), html() 구현해보기`
interface myQuery<T> {
  text(
    param?:
      | string
      | number
      | boolean
      | ((this: T, index: number) => string | boolean | number)
  ): this;
  html(param?: string | Document | DocumentFragment): void;
}
const $tag: myQuery<HTMLElement> = $(
  "p",
  "t"
) as unknown as myQuery<HTMLElement>;

$tag.text("123");
$tag.text();
$tag.text(123);
$tag.text(function (index) {
  console.log(this, index);
  return true;
});
$tag.text().html(document);
