import { CharArr, LetterReg, NumberReg } from "./const";

export const isNumber = (arg: string) => {
  return NumberReg.test(arg);
};

export const isLetter = (arg: string) => {
  return LetterReg.test(arg);
};

export const getRegChars = (numOrigins: string[]) => {
  const result = [];
  let charIndex = 0;
  let num;
  const numAns = [...numOrigins];
  const numToCharMap = new Map();
  while ((num = numAns.shift()) !== undefined) {
    let numToChar = numToCharMap.get(num);
    if (!numToChar) {
      numToChar = CharArr[charIndex++];
      numToCharMap.set(num, numToChar);
    }
    result.push(numToChar);
  }
  return result.join("");
};
