// any 类型与任何类型的交叉都是 any，也就是 1 & any 结果是 any。
type IsAny<T> = 1 extends 0 & T ? true : false;
type IsAnyResult = IsAny<any>;
type IsAnyResult2 = IsAny<1>;

type IsEqual2<A, B> = (<T>() => T extends A ? 1 : 0) extends <
  T
>() => T extends B ? 1 : 0
  ? true
  : false;

type IsEqual2Result = IsEqual2<1, any>;

type IsNever<T> = [T] extends [never] ? true : false;

type IsNeverResult = IsNever<never>;

type NotEqual<A, B> = (<T>() => T extends A ? 1 : 0) extends <
  T
>() => T extends B ? 1 : 0
  ? false
  : true;

type IsTuple<T> = T extends readonly [...params: infer Elements]
  ? NotEqual<Elements["length"], number>
  : false;

type IsTupleResult = IsTuple<[1, 2, 3]>;
type IsTupleResult2 = IsTuple<number[]>;

// 类型之间是有父子关系的，更具体的那个是子类型，比如 A 和 B 的交叉类型 A & B 就是联合类型 A | B 的子类型，因为更具体。
// 如果允许父类型赋值给子类型，就叫做逆变。
// 如果允许子类型赋值给父类型，就叫做协变。
// 联合转交叉
type UnionToIntersection<U> = (
  U extends U ? (x: U) => unknown : never
) extends (x: infer R) => unknown
  ? R
  : never;

type UnionToIntersectionResult = UnionToIntersection<{ a: 1 } | { b: 2 }>;

type GetOptional<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? Key : never]: Obj[Key];
};

type GetOptionalResult = GetOptional<{ name: string; age?: number }>;

type IsRequired<Key extends keyof Obj, Obj> = {} extends Pick<Obj, Key>
  ? never
  : Key;

type GetRequired<Obj extends Record<string, any>> = {
  [Key in keyof Obj as {} extends Pick<Obj, Key> ? never : Key]: Obj[Key];
};

type GetRequiredResult = GetRequired<{ name: string; age?: number }>;
