type Brand<K, T> = K & { __brand: T };

type EUR = Brand<number, "EUR">;
type USD = Brand<number, "USD">;
type KRW = Brand<number, "KRW">;

const usd = 10 as USD;
const eur = 11 as EUR;
const krw = 200 as KRW;
const mymoney = 300 as EUR;
const euroToUsd = (euro: EUR): number => {
  return euro * 1.18;
};
euroToUsd(mymoney);
// euroToUsd(22); 불가
