import {
  handle00Number,
  handle0xNumber,
  handlePureNumber,
  is00Number,
  isMaxNumber,
  isOxNumber,
  isPureNumber,
} from "./number";
import { isNumber, isLetter } from "./common";
import { handlePureLetter, isPureLetter } from "./letter";

const handlerArr = [
  {
    is: isNumber,
    handlers: [
      {
        is: is00Number,
        handler: handle00Number,
      },
      {
        is: isOxNumber,
        handler: handle0xNumber,
      },
      {
        is: isMaxNumber,
        handler: () => ["Digit"],
      },
      {
        is: isPureNumber,
        handler: handlePureNumber,
      },
    ],
  },
  {
    is: isLetter,
    handlers: [
      {
        is: isPureLetter,
        handler: handlePureLetter,
      },
    ],
  },
  // {
  //   is: isEmoji,  类似代码，待实现，参考按照前面的判断方式去实现Emoji的正则表达式
  //   handlers: [{}],
  // },
  // {
  //   is: isName,   类似代码，待实现，参考按照前面的判断方式去实现Name的正则表达式
  //   handlers: [{}],
  // },
];

const detectPattern = (input: string) => {
  const [content, suffix] = input.split(".");
  if (!suffix || suffix !== "bit") {
    throw new Error("should use .bit at the end");
  }
  if (!content) {
    throw new Error("${content}.bit,the content no defined");
  }

  const ans = content.split("");

  const match = handlerArr.find((item) => item.is(content));

  const exec = match?.handlers.find((item) => item.is(content));

  if (exec?.handler) {
    return exec.handler(ans);
  }

  throw Error(`no match reg, check ${content} is valid`);
};

export { detectPattern };
