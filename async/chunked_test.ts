import { assertEquals, assertThrows } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { chunked } from "./chunked.ts";

Deno.test("chunked", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("the length is divisible by the size", async () => {
      const result = chunked(toAsyncIterable([1, 2, 3, 4, 5, 6]), 2);
      const expected = [[1, 2], [3, 4], [5, 6]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is not divisible by the size", async () => {
      const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 2);
      const expected = [[1, 2], [3, 4], [5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is equal to the size", async () => {
      const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 5);
      const expected = [[1, 2, 3, 4, 5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is less than the size", async () => {
      const result = chunked(toAsyncIterable([1, 2, 3, 4, 5]), 6);
      const expected = [[1, 2, 3, 4, 5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("throws RangeError", async (t) => {
      await t.step("if the length is not positive safe integer", () => {
        assertThrows(() => chunked([], NaN), RangeError);
        assertThrows(() => chunked([], Infinity), RangeError);
        assertThrows(() => chunked([], -Infinity), RangeError);
        assertThrows(() => chunked([], -1), RangeError);
        assertThrows(() => chunked([], 1.1), RangeError);
        assertThrows(() => chunked([], 0), RangeError);
      });
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("the length is divisible by the size", async () => {
      const result = chunked([1, 2, 3, 4, 5, 6], 2);
      const expected = [[1, 2], [3, 4], [5, 6]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is not divisible by the size", async () => {
      const result = chunked([1, 2, 3, 4, 5], 2);
      const expected = [[1, 2], [3, 4], [5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is equal to the size", async () => {
      const result = chunked([1, 2, 3, 4, 5], 5);
      const expected = [[1, 2, 3, 4, 5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("the length is less than the size", async () => {
      const result = chunked([1, 2, 3, 4, 5], 6);
      const expected = [[1, 2, 3, 4, 5]];
      assertEquals(await Array.fromAsync(result), expected);
      assertType<IsExact<typeof result, AsyncIterable<number[]>>>(true);
    });

    await t.step("throws RangeError", async (t) => {
      await t.step("if the length is not positive safe integer", () => {
        assertThrows(() => chunked([], NaN), RangeError);
        assertThrows(() => chunked([], Infinity), RangeError);
        assertThrows(() => chunked([], -Infinity), RangeError);
        assertThrows(() => chunked([], -1), RangeError);
        assertThrows(() => chunked([], 1.1), RangeError);
        assertThrows(() => chunked([], 0), RangeError);
      });
    });
  });
});
