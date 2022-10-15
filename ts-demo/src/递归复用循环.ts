type DeepPromiseValueType<P extends Promise<unknown>> = P extends Promise<
  infer Value
>
  ? Value extends Promise<unknown>
    ? DeepPromiseValueType<Value>
    : Value
  : never;

type DeepPromiseValueTypeResult = DeepPromiseValueType<
  Promise<Promise<"guang">>
>;

type ReverseArr<Arr extends unknown[]> = Arr extends [
  infer First,
  ...infer Rest
]
  ? [...ReverseArr<Rest>, First]
  : [];

type ReverseArrResult = ReverseArr<[1, 2, 3, 4]>;

type IsEqual<A, B> = (A extends B ? true : false) &
  (B extends A ? true : false);

type Includes<Arr extends unknown[], FindItem> = Arr extends [
  infer First,
  ...infer Rest
]
  ? IsEqual<First, FindItem> extends true
    ? true
    : Includes<Rest, FindItem>
  : false;

type IncludesResult = Includes<[1, 2, 3, 4], 4>;

type RemoveItem<
  Arr extends unknown[],
  Item,
  Result extends unknown[] = []
> = Arr extends [infer First, ...infer Rest]
  ? IsEqual<First, Item> extends true
    ? RemoveItem<Rest, Item, Result>
    : RemoveItem<Rest, Item, [...Result, First]>
  : Result;

type RemoveItemResult = RemoveItem<[1, 2, 3, 4], 4>;

type BuildArr<
  Length extends number,
  Ele = unknown,
  Arr extends unknown[] = []
> = Arr["length"] extends Length ? Arr : BuildArr<Length, Ele, [...Arr, Ele]>;

type BuildArrResult = BuildArr<6, 5>;

type ReplaceAll<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Left}${From}${infer Right}`
  ? `${Left}${To}${ReplaceAll<Right, From, To>}`
  : Str;

type ReplaceAllResult = ReplaceAll<"guang guang guang", "guang", "jun">;

type StringToUnion<Str extends string> =
  Str extends `${infer First}${infer Rest}`
    ? First | StringToUnion<Rest>
    : never;

type StringToUnionResult = StringToUnion<"guang">;

type ReverseStr<Str extends string> = Str extends `${infer First}${infer Rest}`
  ? `${ReverseStr<Rest>}${First}`
  : Str;

type ReverseStrResult = ReverseStr<"guang">;

type DeepReadonly<Obj extends object> = {
  readonly [Key in keyof Obj]: Obj[Key] extends object
    ? DeepReadonly<Obj[Key]>
    : Obj[Key];
};

type DeepReadonlyResult = DeepReadonly<{ a: { b: 1 } }>;
