import { getRegChars } from "./common";
import { PureNumberReg } from "./const";

export const getKNumberReg = (len: number) => {
  return `${Math.pow(10, len - 3)}K`;
};

export const getKNumberRegAns = (len: number) => {
  if (len <= 3) {
    return [];
  } else if (len >= 6) {
    return [];
  } else {
    return [getKNumberReg(len)];
  }
};

export const isPureNumber = (args: string) => {
  return PureNumberReg.test(args);
};

const MaxLen = 7;
export const isMaxNumber = (numArr: string) => {
  return numArr.length >= MaxLen;
};

export const is00Number = (numArr: string) => {
  return numArr[0] === "0" && numArr[1] === "0";
};

export const isOxNumber = (numArr: string) => {
  return numArr[0] === "0" && numArr[1] === "x";
};

export const getXNumberReg = (len: number) => {
  return "00" + "X".repeat(len);
};

export const getDNumberReg = (len: number) => {
  return `${len}D`;
};

export const get0xNumberReg = (len: number) => {
  return `0x${getKNumberReg(len)}`;
};

export const handle00Number = (numAns: string[]) => {
  return [
    getXNumberReg(numAns.length - 2),
    ...getKNumberRegAns(numAns.length),
    getDNumberReg(numAns.length),
    "Digit",
  ];
};

export const handle0xNumber = (numAns: string[]) => {
  return [get0xNumberReg(numAns.length - 2), "Digit"];
};

export const handlePureNumber = (numAns: string[]) => {
  return [
    getRegChars(numAns),
    ...getKNumberRegAns(numAns.length),
    `${numAns.length}D`,
    "Digit",
  ];
};
