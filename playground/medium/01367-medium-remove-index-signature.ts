/*
  1367 - Remove Index Signature
  -------
  by hiroya iizuka (@hiroyaiizuka) #中等 #object-keys

  ### 题目

  Implement `RemoveIndexSignature<T>` , exclude the index signature from object types.

  For example:

  ```ts
  type Foo = {
    [key: string]: any
    foo(): void
  }

  type A = RemoveIndexSignature<Foo> // expected { foo(): void }
  ```

  > 在 Github 上查看：https://tsch.js.org/1367/zh-CN
*/

/* _____________ 你的代码 _____________ */

// type RemoveIndexSignature<T> = { [key in keyof T]: key extends [infer a] ? never : T[key] }

/**
 *
 * P extends K ? never : (K extends P ? K : never)   P = string | number | symbol
 *
 * // becomes
 * (string | number | symbol) extends K ? never : (K extends P ? K : never)
 *
 * // becomes
 * | string extends K ? never : (K extends string ? K : never)
 * | number extends K ? never : (K extends number ? K : never)
 * | symbol extends K ? never : (K extends symbol ? K : never)
 *
 * 总之 要留下具体属性 去掉索引签名
 * 具体属性 无法实现 string | number | symbol extends K
 */

type RemoveIndexSignature<T, P = PropertyKey> = {
  [K in keyof T as P extends K ? never : K extends P ? K : never]: T[K]
}

/* _____________ 测试用例 _____________ */
import type { Equal, Expect } from '@type-challenges/utils'

type Foo = {
  [key: string]: any
  foo(): void
}

type Bar = {
  [key: number]: any
  bar(): void
  0: string
}

const foobar = Symbol('foobar')
type FooBar = {
  [key: symbol]: any
  [foobar](): void
}

type Baz = {
  bar(): void
  baz: string
}

type cases = [
  Expect<Equal<RemoveIndexSignature<Foo>, { foo(): void }>>,
  Expect<Equal<RemoveIndexSignature<Bar>, { bar(): void, 0: string }>>,
  Expect<Equal<RemoveIndexSignature<FooBar>, { [foobar](): void }>>,
  Expect<Equal<RemoveIndexSignature<Baz>, { bar(): void, baz: string }>>,
]

/* _____________ 下一步 _____________ */
/*
  > 分享你的解答：https://tsch.js.org/1367/answer/zh-CN
  > 查看解答：https://tsch.js.org/1367/solutions
  > 更多题目：https://tsch.js.org/zh-CN
*/
