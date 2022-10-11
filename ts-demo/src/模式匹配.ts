type p = Promise<"guang">;

type GetValueType<P> = P extends Promise<infer Value> ? Value : never;

type GetValueTypeResult = GetValueType<p>;

type arr = [1, 2, 3];

type GetFirst<Arr extends unknown[]> = Arr extends [infer First, ...unknown[]]
  ? First
  : never;

type GetFirstResult = GetFirst<arr>;

type GetLast<Arr extends unknown[]> = Arr extends [...unknown[], infer Last]
  ? Last
  : never;

type GetLastResult = GetLast<arr>;

type PopArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [...infer Rest, unknown]
  ? Rest
  : never;

type GetPopArrResult = PopArr<arr>;
type GetPopArrResult2 = PopArr<[]>;

type ShiftArr<Arr extends unknown[]> = Arr extends []
  ? []
  : Arr extends [unknown, ...infer Rest]
  ? Rest
  : never;

type ShiftArrResult = ShiftArr<arr>;
type ShiftArrResult2 = ShiftArr<[]>;

type StartWith<
  Str extends string,
  Prefix extends string
> = Str extends `${Prefix}${string}` ? true : false;

type StartWithResult = StartWith<"#root", "#">;
type StartWithResult2 = StartWith<"#root", "1">;

type ReplaceFromTo<
  Str extends string,
  From extends string,
  To extends string
> = Str extends `${infer Prefix}${From}${infer Suffix}`
  ? `${Prefix}${To}${Suffix}`
  : Str;

type ReplaceFromToResult = ReplaceFromTo<"guang and yin is ?", "?", "family">;

type TrimStrRight<Str extends string> = Str extends `${infer Rest}${
  | " "
  | "\n"
  | "\t"}`
  ? TrimStrRight<Rest>
  : Str;
type TrimStrLeft<Str extends string> = Str extends `${
  | " "
  | "\n"
  | "\t"}${infer Rest}`
  ? TrimStrLeft<Rest>
  : Str;

type TrimStr<Str extends string> = TrimStrRight<TrimStrLeft<Str>>;

type TrimStrResult = TrimStr<" guang ">;

type GetParameters<Func extends Function> = Func extends (
  ...args: infer Args
) => unknown
  ? Args
  : never;

type GetParametersResult = GetParameters<(a: 1, b: 2) => void>;

type GetReturnType<Func extends Function> = Func extends (
  ...args: any[]
) => infer ReturnType
  ? ReturnType
  : never;

type GetReturnTypeResult = GetReturnType<(a: 1, b: 2) => "guang">;

type GetThisParameterType<T> = T extends (
  this: infer ThisType,
  ...args: any[]
) => any
  ? ThisType
  : unknown;

class Dog {
  name: string;
  constructor() {
    this.name = "dog";
  }
  hello(this: Dog) {
    return "hello: " + this.name;
  }
}

const dog = new Dog();

type GetThisParameterTypeResult = GetThisParameterType<typeof dog.hello>;

interface Person {
  name: string;
}

interface PersonConstructor {
  new (name: string): Person;
}

type GetInstanceType<ConstructorType extends new (...args: any) => any> =
  ConstructorType extends new (...args: any) => infer InstanceType
    ? InstanceType
    : any;

type GetInstanceTypeResult = GetInstanceType<PersonConstructor>;

type GetConstructorParameters<
  ConstructorType extends new (...args: any) => any
> = ConstructorType extends new (...args: infer ParametersType) => any
  ? ParametersType
  : never;

type GetConstructorParametersResult =
  GetConstructorParameters<PersonConstructor>;

type GetRefProps<Props> = "ref" extends keyof Props
  ? Props extends { ref?: infer Value }
    ? Value
    : never
  : never;

type GetRefResult = GetRefProps<{ ref: 1; name: "guang" }>;
type GetRefResult2 = GetRefProps<{ ref: undefined; name: "xxx" }>;
type GetRefResult3 = GetRefProps<{ name: "xxx" }>;
