type Union = "a" | "b" | "c";

type UppercaseA<Item extends string> = Item extends "a"
  ? Uppercase<Item>
  : Item;

type UppercaseAResult = UppercaseA<Union>;

type isUnion<A, B = A> = A extends A ? ([B] extends [A] ? false : true) : never;

type isUnionResult = isUnion<"a" | "b">;
type isUnionResult2 = isUnion<"a">;

type BEM<
  Block extends string,
  Element extends string[],
  Modifies extends string[]
> = `${Block}__${Element[number]}--${Modifies[number]}`;

type BEMResult = BEM<"class", ["a", "aa"], ["b", "bb"]>;

type Combine<A extends string, B extends string> =
  | A
  | B
  | `${A}${B}`
  | `${B}${A}`;

type AllCombines<A extends string, B extends string = A> = A extends A
  ? Combine<A, Exclude<B, A>>
  : never;

type AllCombinesResult = AllCombines<"A" | "B" | "C">;
