import { test } from "@cross/test";
import { assertEquals } from "@std/assert";
import { assertType, type IsExact } from "@std/testing/types";
import { pipe } from "@core/pipe";
import { take } from "./take.ts";

await test("take usage 1", async () => {
  const result = pipe([1, 2, 3, 4, 5], take(2));
  const expected = [1, 2];
  assertEquals(await Array.fromAsync(result), expected);
  assertType<IsExact<typeof result, AsyncIterable<number>>>(true);
});
