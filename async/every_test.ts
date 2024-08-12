import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { toAsyncIterable } from "./to_async_iterable.ts";
import { every } from "./every.ts";

Deno.test("every", async (t) => {
  await t.step("with async iterable", async (t) => {
    await t.step("true", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v, index) => {
          values.push(v);
          indices.push(index);
          return v < 6;
        },
      );
      const expected = true;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v, index) => {
          values.push(v);
          indices.push(index);
          return v < 3;
        },
      );
      const expected = false;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3]);
      assertEquals(indices, [0, 1, 2]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise true", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v, index) => {
          values.push(v);
          indices.push(index);
          return Promise.resolve(v < 6);
        },
      );
      const expected = true;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise false", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        toAsyncIterable([1, 2, 3, 4, 5]),
        (v, index) => {
          values.push(v);
          indices.push(index);
          return Promise.resolve(v < 3);
        },
      );
      const expected = false;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3]);
      assertEquals(indices, [0, 1, 2]);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });

  await t.step("with iterable", async (t) => {
    await t.step("true", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every([1, 2, 3, 4, 5], (v, index) => {
        values.push(v);
        indices.push(index);
        return v < 6;
      });
      const expected = true;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("false", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every([1, 2, 3, 4, 5], (v, index) => {
        values.push(v);
        indices.push(index);
        return v < 3;
      });
      const expected = false;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3]);
      assertEquals(indices, [0, 1, 2]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise true", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        [1, 2, 3, 4, 5],
        (v, index) => {
          values.push(v);
          indices.push(index);
          return Promise.resolve(v < 6);
        },
      );
      const expected = true;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3, 4, 5]);
      assertEquals(indices, [0, 1, 2, 3, 4]);
      assertType<IsExact<typeof result, boolean>>(true);
    });

    await t.step("promise false", async () => {
      const values: number[] = [];
      const indices: number[] = [];
      const result = await every(
        [1, 2, 3, 4, 5],
        (v, index) => {
          values.push(v);
          indices.push(index);
          return Promise.resolve(v < 3);
        },
      );
      const expected = false;
      assertEquals(result, expected);
      assertEquals(values, [1, 2, 3]);
      assertEquals(indices, [0, 1, 2]);
      assertType<IsExact<typeof result, boolean>>(true);
    });
  });
});
