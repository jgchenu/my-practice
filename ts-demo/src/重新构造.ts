// 数组类型的重新构造
type Push<Arr extends unknown[], Ele> = [...Arr, Ele];

type PushResult = Push<[1, 2, 3, 4], 5>;

// Unshift
type Unshift<Arr extends unknown[], Ele> = [Ele, ...Arr];

type UnshiftResult = Unshift<[1, 2, 3, 4], 5>;

// Zip
type Zip2<One extends unknown[], Other extends unknown[]> = One extends [
  infer OneFirst,
  ...infer OneRest
]
  ? Other extends [infer OtherFirst, ...infer OtherRest]
    ? [[OneFirst, OtherFirst], ...Zip2<OneRest, OtherRest>]
    : []
  : [];

type Zip2Result = Zip2<[1, 2, 3], ["guang", "dong"]>;

// 字符串类型的重新构造
// CapitalizeStr
type CapitalizeStr<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? `${Uppercase<First>}${Rest}`
    : Str;

type CapitalizeStrResult = CapitalizeStr<"guang">;

// CamelCase

type CamelCase<Str extends string> =
  Str extends `${infer First}_${infer Right}${infer Rest}`
    ? `${First}${Uppercase<Right>}${CamelCase<Rest>}`
    : Str;

type CamelCaseResult = CamelCase<"guang_guang_guang">;

// DropSubStr

type DropSubStr<
  Str extends string,
  SubStr extends string
> = Str extends `${infer Prefix}${SubStr}${infer Suffix}`
  ? `${Prefix}${DropSubStr<Suffix, SubStr>}`
  : Str;

type DropSubStrResult = DropSubStr<"guang~~~", "~">;

// 函数类型的重新构造：

type AppendArgument<Func extends Function, Arg> = Func extends (
  ...args: infer Args
) => infer ReturnType
  ? (...args: [...Args, Arg]) => ReturnType
  : never;

type AppendArgumentResult = AppendArgument<(name: string) => 1, number>;

// 索引类型的重新构造

type Mapping<Obj extends object> = {
  [Key in keyof Obj]: [Obj[Key], Obj[Key], Obj[Key]];
};

type MappingResult = Mapping<{ a: 1; b: 2 }>;

type UppercaseKey<Obj extends object> = {
  [Key in keyof Obj as Uppercase<Key & string>]: Obj[Key];
};

type UppercaseKeyResult = UppercaseKey<{ a: 1; b: 2 }>;

type ToReadonly<T> = {
  readonly [Key in keyof T]: T[Key];
};

type ToReadonlyResult = ToReadonly<{ a: 1 }>;

type ToPartial<T> = {
  [Key in keyof T]?: T[Key];
};

type ToPartialResult = ToPartial<{ a: 1 }>;

type ToMutable<T> = {
  -readonly [Key in keyof T]: T[Key];
};

type ToMutableResult = ToMutable<{ readonly a: 1 }>;

type ToRequired<T> = {
  [Key in keyof T]-?: T[Key];
};

type ToRequiredResult = ToRequired<{ a?: 1 }>;

type FilterByValueType<Obj extends Record<string, any>, ValueType> = {
  [Key in keyof Obj as Obj[Key] extends ValueType ? Key : never]: Obj[Key];
};

type FilterByValueTypeResult = FilterByValueType<
  { age: number; name: "jgchen" },
  number
>;
