import { getRegChars } from "./common";
import { PureLetterReg } from "./const";

export const isPureLetter = (arg: string) => {
  return PureLetterReg.test(arg);
};

export const handlePureLetter = (ans: string[]) => {
  return [`Letter${getRegChars(ans)}`];
};
