import { some as base } from "../some.ts";

/**
 * Returns an operator that tests whether at least one element in the iterable satisfies the provided testing function.
 *
 * See {@linkcode https://jsr.io/@core/iterutil/doc/some/~/some some} for native some.
 *
 * @param fn The function to check with.
 * @returns An operator that tests whether at least one element in the iterable satisfies the provided testing function.
 *
 * @example
 * ```ts
 * import { pipe } from "@core/pipe";
 * import { some } from "@core/iterutil/pipe/some";
 *
 * console.log(pipe(
 *   [1 ,2, 3],
 *   some((v) => v % 2 === 0),
 * )); // true
 * console.log(pipe([1, 3, 5], some((v) => v % 2 === 0))); // false
 * ```
 */
export function some<T>(
  fn: (value: T) => boolean,
): (iterable: Iterable<T>) => boolean {
  return (iterable) => base(iterable, fn);
}
