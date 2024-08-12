# iterutil

[![jsr](https://jsr.io/badges/@core/iterutil)](https://jsr.io/@core/iterutil)
[![test](https://github.com/jsr-core/iterutil/workflows/Test/badge.svg)](https://github.com/jsr-core/iterutil/actions?query=workflow%3ATest)
[![codecov](https://codecov.io/github/jsr-core/iterutil/graph/badge.svg?token=pfbLRGU5AM)](https://codecov.io/github/jsr-core/iterutil)

Iterator / AsyncIterator utility pack for JavaScript and TypeScript. Each module
is designed to work independently, avoiding internal inter-dependencies as much
as possible.

## Usage

Modules exported from the root of the package are for synchronous iterables
(`Iterable`). Modules exported from the `async` submodule of the package are for
both synchronous and asynchronous iterables (`Iterable` and `AsyncIterable`).

### chain

Chains multiple iterables together.

```ts
import { chain } from "@core/iterutil/chain";

const iter = chain([1, 2], ["a", "b"], [true, false]);
console.log(Array.from(iter)); // [1, 2, "a", "b", true, false]
```

```ts
import { chain } from "@core/iterutil/async/chain";

const iter = chain([1, 2], ["a", "b"], [true, false]);
console.log(await Array.fromAsync(iter)); // [1, 2, "a", "b", true, false]
```

### chunked

Chunks an iterable into arrays of a given size.

```ts
import { chunked } from "@core/iterutil/chunked";

const iter = chunked([1, 2, 3, 4, 5], 2);
console.log(Array.from(iter)); // [[1, 2], [3, 4], [5]]
```

```ts
import { chunked } from "@core/iterutil/async/chunked";

const iter = chunked([1, 2, 3, 4, 5], 2);
console.log(await Array.fromAsync(iter)); // [[1, 2], [3, 4], [5]]
```

### compact

Removes all nullish (`null` or `undefined`) values from an iterable.

```ts
import { compact } from "@core/iterutil/compact";

const iter = compact([1, undefined, 2, null, 3]);
console.log(Array.from(iter)); // [1, 2, 3]
```

```ts
import { compact } from "@core/iterutil/async/compact";

const iter = compact([1, undefined, 2, null, 3]);
console.log(await Array.fromAsync(iter)); // [1, 2, 3]
```

### compress

Compresses an iterable by selecting elements using a selector iterable.

```ts
import { compress } from "@core/iterutil/compress";

const iter = compress(
  [1, 2, 3, 4, 5],
  [true, false, true, false, true],
);
console.log(Array.from(iter)); // [1, 3, 5]
```

```ts
import { compress } from "@core/iterutil/async/compress";

const iter = compress(
  [1, 2, 3, 4, 5],
  [true, false, true, false, true],
);
console.log(await Array.fromAsync(iter)); // [1, 3, 5]
```

### count

Generates an infinite sequence of numbers starting from `start` with a step of
`step`.

```ts
import { count } from "@core/iterutil/count";
import { take } from "@core/iterutil/take";

const iter = count(1, 2);
console.log(Array.from(take(iter, 5))); // [1, 3, 5, 7, 9]
```

### cycle

Returns an infinite iterable that cycles through the given iterable.

```ts
import { cycle } from "@core/iterutil/cycle";
import { take } from "@core/iterutil/take";

const iter = cycle([1, 2, 3]);
console.log(Array.from(take(iter, 5))); // [1, 2, 3, 1, 2]
```

```ts
import { cycle } from "@core/iterutil/async/cycle";
import { take } from "@core/iterutil/async/take";

const iter = cycle([1, 2, 3]);
console.log(await Array.fromAsync(take(iter, 5))); // [1, 2, 3, 1, 2]
```

### drop

Drops the first `limit` items from the iterable.

```ts
import { drop } from "@core/iterutil/drop";

const iter = drop([1, 2, 3, 4, 5], 2);
console.log(Array.from(iter)); // [3, 4, 5]
```

```ts
import { drop } from "@core/iterutil/async/drop";

const iter = drop([1, 2, 3, 4, 5], 2);
console.log(await Array.fromAsync(iter)); // [3, 4, 5]
```

### dropWhile

Drops elements from the iterable while the predicate returns true.

```ts
import { dropWhile } from "@core/iterutil/drop-while";

const iter = dropWhile(
  [1, 2, 3, 4, 5],
  (v) => v < 3,
);
console.log(Array.from(iter)); // [3, 4, 5]
```

```ts
import { dropWhile } from "@core/iterutil/async/drop-while";

const iter = dropWhile(
  [1, 2, 3, 4, 5],
  (v) => v < 3,
);
console.log(await Array.fromAsync(iter)); // [3, 4, 5]
```

### enumerate

Enumerates an iterable.

```ts
import { enumerate } from "@core/iterutil/enumerate";

const iter = enumerate(["a", "b", "c"]);
console.log(Array.from(iter)); // [[0, "a"], [1, "b"], [2, "c"]]
```

```ts
import { enumerate } from "@core/iterutil/async/enumerate";

const iter = enumerate(["a", "b", "c"]);
console.log(await Array.fromAsync(iter)); // [[0, "a"], [1, "b"], [2, "c"]]
```

### every

Returns true if every element in the iterable satisfies the provided testing
function.

```ts
import { every } from "@core/iterutil/every";

console.log(every([1, 2, 3], (v) => v > 0)); // true
console.log(every([1, 2, 3], (v) => v > 1)); // false
```

```ts
import { every } from "@core/iterutil/async/every";

console.log(await every([1, 2, 3], (v) => v > 0)); // true
console.log(await every([1, 2, 3], (v) => v > 1)); // false
```

### filter

Filters an iterable based on a function.

```ts
import { filter } from "@core/iterutil/filter";

const iter = filter(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(Array.from(iter)); // [2, 4]
```

```ts
import { filter } from "@core/iterutil/async/filter";

const iter = filter(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(await Array.fromAsync(iter)); // [2, 4]
```

### find

Returns the first element in the iterable that satisfies the provided testing
function. Otherwise, undefined is returned.

```ts
import { find } from "@core/iterutil/find";

const value = find(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(value); // 2
```

```ts
import { find } from "@core/iterutil/async/find";

const value = await find(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(value); // 2
```

### first

Returns the first element of an iterable. If the iterable is empty, returns
`undefined`.

```ts
import { first } from "@core/iterutil/first";

const result = first([1, 2, 3]);
console.log(result); // 1
```

```ts
import { first } from "@core/iterutil/async/first";

const result = await first([1, 2, 3]);
console.log(result); // 1
```

### flatMap

Maps each value in an iterable to an iterable, then flattens the result.

```ts
import { flatMap } from "@core/iterutil/flat-map";

const iter = flatMap(
  [1, 2, 3],
  (v) => [v, v],
);
console.log(Array.from(iter)); // [1, 1, 2, 2, 3, 3]
```

```ts
import { flatMap } from "@core/iterutil/async/flat-map";

const iter = flatMap(
  [1, 2, 3],
  (v) => [v, v],
);
console.log(await Array.fromAsync(iter)); // [1, 1, 2, 2, 3, 3]
```

### flatten

Flattens an iterable of iterables into a single iterable.

```ts
import { flatten } from "@core/iterutil/flatten";

const iter = flatten([[1, 2], [3, 4], [5]]);
console.log(Array.from(iter)); // [1, 2, 3, 4, 5]
```

```ts
import { flatten } from "@core/iterutil/async/flatten";

const iter = flatten([[1, 2], [3, 4], [5]]);
console.log(await Array.fromAsync(iter)); // [1, 2, 3, 4, 5]
```

### forEach

Calls a function for each value in an iterable.

```ts
import { forEach } from "@core/iterutil/for-each";
forEach([1, 2, 3], (v) => console.log(v));
// 1
// 2
// 3
```

```ts
import { forEach } from "@core/iterutil/async/for-each";
await forEach([1, 2, 3], (v) => console.log(v));
// 1
// 2
// 3
```

### iter

Converts an iterable to an iterator.

```ts
import { iter } from "@core/iterutil/iter";

const it = iter([1, 2, 3, 4, 5]);
console.log(it.next()); // { value: 1, done: false }
console.log(it.next()); // { value: 2, done: false }

for (const value of it) {
  console.log(value);
}
// 3
// 4
// 5
```

```ts
import { iter } from "@core/iterutil/async/iter";

const it = iter([1, 2, 3, 4, 5]);
console.log(await it.next()); // { value: 1, done: false }
console.log(await it.next()); // { value: 2, done: false }

for await (const value of it) {
  console.log(value);
}
// 3
// 4
// 5
```

### last

Returns the last element of an iterable.

```ts
import { last } from "@core/iterutil/last";

console.log(last([1, 2, 3])); // 3
console.log(last([])); // undefined
```

```ts
import { last } from "@core/iterutil/async/last";

console.log(await last([1, 2, 3])); // 3
console.log(await last([])); // undefined
```

### map

Maps an iterable with a function.

```ts
import { map } from "@core/iterutil/map";

const iter = map(
  [1, 2, 3],
  (v) => v * 2,
);
console.log(Array.from(iter)); // [2, 4, 6]
```

```ts
import { map } from "@core/iterutil/async/map";

const iter = map(
  [1, 2, 3],
  (v) => v * 2,
);
console.log(await Array.fromAsync(iter)); // [2, 4, 6]
```

### pairwise

Returns an iterable that pairs adjacent elements from the input iterable.

```ts
import { pairwise } from "@core/iterutil/pairwise";

const iter = pairwise([1, 2, 3, 4, 5]);
console.log(Array.from(iter)); // [[1, 2], [2, 3], [3, 4], [4, 5]]
```

```ts
import { pairwise } from "@core/iterutil/async/pairwise";

const iter = pairwise([1, 2, 3, 4, 5]);
console.log(await Array.fromAsync(iter)); // [[1, 2], [2, 3], [3, 4], [4, 5]]
```

### partition

Partitions an iterable into two arrays based on a selector function.

```ts
import { partition } from "@core/iterutil/partition";

const [even, odd] = partition(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(even); // [2, 4]
console.log(odd); // [1, 3, 5]
```

```ts
import { partition } from "@core/iterutil/async/partition";

const [even, odd] = await partition(
  [1, 2, 3, 4, 5],
  (v) => v % 2 === 0,
);
console.log(even); // [2, 4]
console.log(odd); // [1, 3, 5]
```

### range

Generates a range of numbers.

```ts
import { range } from "@core/iterutil/range";

console.log(Array.from(range(1, 3))); // [1, 2, 3]
console.log(Array.from(range(1, 6, 2))); // [1, 3, 5]
```

### reduce

Reduces an iterable into a single value.

```ts
import { reduce } from "@core/iterutil/reduce";

const sum = reduce(
  [1, 2, 3, 4, 5],
  (acc, v) => acc + v,
);
console.log(sum); // 15

const joined = reduce(
  [1, 2, 3, 4, 5],
  (acc, v) => acc + v,
  "",
);
console.log(joined); // 12345
```

```ts
import { reduce } from "@core/iterutil/async/reduce";

const sum = await reduce(
  [1, 2, 3, 4, 5],
  (acc, v) => acc + v,
);
console.log(sum); // 15

const joined = await reduce(
  [1, 2, 3, 4, 5],
  (acc, v) => acc + v,
  "",
);
console.log(joined); // 12345
```

### some

Returns true if at least one element in the iterable satisfies the provided

```ts
import { some } from "@core/iterutil/some";

console.log(some([1, 2, 3], (v) => v % 2 === 0)); // true
console.log(some([1, 3, 5], (v) => v % 2 === 0)); // false
```

```ts
import { some } from "@core/iterutil/async/some";

console.log(await some([1, 2, 3], (v) => v % 2 === 0)); // true
console.log(await some([1, 3, 5], (v) => v % 2 === 0)); // false
```

### take

Takes the first `limit` items from the iterable.

```ts
import { take } from "@core/iterutil/take";

const iter = take([1, 2, 3, 4, 5], 2);
console.log(Array.from(iter)); // [1, 2]
```

```ts
import { take } from "@core/iterutil/async/take";

const iter = take([1, 2, 3, 4, 5], 2);
console.log(await Array.fromAsync(iter)); // [1, 2]
```

### takeWhile

Takes elements from the iterable while the predicate is true.

```ts
import { takeWhile } from "@core/iterutil/take-while";

const iter = takeWhile(
  [1, 2, 3, 4, 5],
  (v) => v < 4,
);
console.log(Array.from(iter)); // [1, 2, 3]
```

```ts
import { takeWhile } from "@core/iterutil/async/take-while";

const iter = takeWhile(
  [1, 2, 3, 4, 5],
  (v) => v < 4,
);
console.log(await Array.fromAsync(iter)); // [1, 2, 3]
```

### toAsyncIterable

Converts an iterable to an async iterable.

```ts
import { toAsyncIterable } from "@core/iterutil/async/to-async-iterable";

const iter = toAsyncIterable([1, 2, 3]);
console.log(await Array.fromAsync(iter)); // [1, 2, 3]
```

### uniq

Returns an iterable that yields the unique elements of the input iterable.

```ts
import { uniq } from "@core/iterutil/uniq";

const iter1 = uniq([1, 2, 2, 3, 3, 3]);
console.log(Array.from(iter1)); // [1, 2, 3]

const iter2 = uniq(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  (v) => v % 4,
);
console.log(Array.from(iter2)); // [1, 2, 3, 4]
```

```ts
import { uniq } from "@core/iterutil/async/uniq";

const iter1 = uniq([1, 2, 2, 3, 3, 3]);
console.log(await Array.fromAsync(iter1)); // [1, 2, 3]

const iter2 = uniq(
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  (v) => v % 4,
);
console.log(await Array.fromAsync(iter2)); // [1, 2, 3, 4]
```

### zip

Zips multiple iterables into a single iterable.

```ts
import { zip } from "@core/iterutil/zip";

const iter = zip([1, 2, 3], ["a", "b", "c"]);
console.log(Array.from(iter)); // [[1, "a"], [2, "b"], [3, "c"]]
```

```ts
import { zip } from "@core/iterutil/async/zip";

const iter = zip([1, 2, 3], ["a", "b", "c"]);
console.log(await Array.fromAsync(iter)); // [[1, "a"], [2, "b"], [3, "c"]]
```

## License

The code follows MIT license written in [LICENSE](./LICENSE). Contributors need
to agree that any modifications sent in this repository follow the license.
