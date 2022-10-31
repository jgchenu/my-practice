type KebabCaseToCamelCase<T extends string> =
  T extends `${infer Item}-${infer Rest}`
    ? `${Item}${KebabCaseToCamelCase<Capitalize<Rest>>}`
    : T;

type KebabCaseToCamelCaseResult = KebabCaseToCamelCase<"jian-guang">;

type CamelCaseToKebabCase<T extends string> =
  T extends `${infer First}${infer Rest}`
    ? First extends Lowercase<First>
      ? `${First}${CamelCaseToKebabCase<Rest>}`
      : `-${First}${CamelCaseToKebabCase<Rest>}`
    : T;

type CamelCaseToKebabCaseResult = CamelCaseToKebabCase<"jianGuang">;

type Func2 = (s: string) => string & ((s: number) => number);

declare const func3: Func2;

type UnionToFuncIntersection<T> = UnionToIntersection<
  T extends any ? () => T : never
>;

type UnionToTuple<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer ReturnType
  ? [...UnionToTuple<Exclude<T, ReturnType>>, ReturnType]
  : [];

type UnionToTupleResult = UnionToTuple<"a" | "b" | "c">;

declare function join<Delimiter extends string>(
  delimiter: Delimiter
): <Items extends string[]>(...parts: Items) => JoinType<Items, Delimiter>;

type JoinType<
  Items extends any[],
  Delimiter extends string,
  Result extends string = ""
> = Items extends [infer Cur, ...infer Rest]
  ? JoinType<Rest, Delimiter, `${Result}${Delimiter}${Cur & string}`>
  : RemoveFirstDelimiter<Result>;

type RemoveFirstDelimiter<Str extends string> =
  Str extends `${infer _}${infer Rest}` ? Rest : Str;

let joinResult = join("-")("guang", "and", "jun");

type DeepCamelize<Obj extends Record<string, any>> = Obj extends unknown[]
  ? CamelizeArr<Obj>
  : {
      [Key in keyof Obj as Key extends `${infer First}_${infer Rest}`
        ? `${First}${Capitalize<Rest>}`
        : Key]: DeepCamelize<Obj[Key]>;
    };

type CamelizeArr<Arr> = Arr extends [
  infer First extends Record<string, any>,
  ...infer Rest
]
  ? [DeepCamelize<First>, ...CamelizeArr<Rest>]
  : [];

type obj = {
  aaa_bbb: string;
  bbb_ccc: [
    {
      ccc_ddd: string;
    },
    {
      ddd_eee: string;
      eee_fff: {
        fff_ggg: string;
      };
    }
  ];
};

type DeepCamelizeRes = DeepCamelize<obj>;

type AllKeyPath<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Key extends string
    ? Obj[Key] extends Record<string, any>
      ? Key | `${Key}.${AllKeyPath<Obj[Key]>}`
      : Key
    : never;
}[keyof Obj];

type AllKeyPathResult = AllKeyPath<{ a: { b: string } }>;

type Defaultize<A, B> = Pick<A, Exclude<keyof A, keyof B>> &
  Partial<Pick<A, Extract<keyof A, keyof B>>> &
  Partial<Pick<B, Exclude<keyof B, keyof A>>>;

type Copy<Obj extends Record<string, any>> = {
  [Key in keyof Obj]: Obj[Key];
};

type DefaultizeResult = Copy<Defaultize<{ a: 1; b: 2 }, { b: 2; c: 3 }>>;
