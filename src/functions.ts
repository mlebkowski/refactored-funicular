// since we don’t have ramda…
export const nthArgument =
  (idx: number) =>
  (...args: unknown[]) =>
    args.at(idx);
export const add = (alpha: number) => (bravo: number) => alpha + bravo;
export const compose =
  (...fns) =>
  (input) =>
    fns.reduce((acc, fn) => fn(acc), input);
export const flatMap =
  <T, R>(fn: (arg: T) => R) =>
  (iterable: T[]): R[] =>
    iterable.flatMap(fn);
export const concat =
  <T>(iterable: T[]) =>
  (value: T | T[]): T[] =>
    iterable.concat(value);
