/*
  1097 - IsUnion
  -------
  by null (@bencor) #中等 #union

  ### 题目

  Implement a type `IsUnion`, which takes an input type `T` and returns whether `T` resolves to a union type.

  For example:

  ```ts
  type case1 = IsUnion<string> // false
  type case2 = IsUnion<string | number> // true
  type case3 = IsUnion<[string | number]> // false
  ```

  > 在 Github 上查看：https://tsch.js.org/1097/zh-CN
*/

/* _____________ 你的代码 _____________ */
/**
 * 1.2 T extends B ? ...
这一步通过条件类型 T extends B ? 来逐个检查 T 是否可以扩展为 B。

这里的 T extends B 意义在于，它会触发联合类型的分布式特性——当 T 是联合类型时，TypeScript 会逐个拆解 T 的联合类型成员，并逐个判断是否符合条件。

例如，{ a: string } | { a: number } 会被拆解为两次递归检查，分别判断 { a: string } 和 { a: number }。

1.3 [B] extends [T] ? false : true
这个条件用于区分 T 是否为联合类型：

[B] extends [T] ?：这里的 B 是初始的 T，而 T 是联合类型的一个子类型。

如果 T 不是联合类型（即 T 没有被拆解），B 和 T 的关系会相等，[B] extends [T] 为 true。
如果 T 是联合类型并被拆解后，B 仍然是最原始的类型，而 T 则是其中的一个成员，因此 [B] extends [T] 为 false。
 */
type IsUnion<T, B = T> = [T] extends [never] ? false : T extends B ? [B] extends [T] ? false : true : never

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type cases = [
  Expect<Equal<IsUnion<string>, false>>,
  Expect<Equal<IsUnion<string | number>, true>>,
  Expect<Equal<IsUnion<'a' | 'b' | 'c' | 'd'>, true>>,
  Expect<Equal<IsUnion<undefined | null | void | ''>, true>>,
  Expect<Equal<IsUnion<{ a: string } | { a: number }>, true>>,
  Expect<Equal<IsUnion<{ a: string | number }>, false>>,
  Expect<Equal<IsUnion<[string | number]>, false>>,
  // Cases where T resolves to a non-union type.
  Expect<Equal<IsUnion<string | never>, false>>,
  Expect<Equal<IsUnion<string | unknown>, false>>,
  Expect<Equal<IsUnion<string | any>, false>>,
  Expect<Equal<IsUnion<string | 'a'>, false>>,
  Expect<Equal<IsUnion<never>, false>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1097/answer/zh-CN
  > 查看解答：https://tsch.js.org/1097/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
