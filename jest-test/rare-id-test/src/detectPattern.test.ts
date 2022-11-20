import { detectPattern } from "./detectPattern";

describe("detectPattern from number", () => {
  it("'333.bit' to be ['AAA', '3D', 'Digit']", () => {
    expect(detectPattern("333.bit")).toEqual(["AAA", "3D", "Digit"]);
  });

  it("'2112.bit' to be ['ABBC','10K', '4D', 'Digit']", () => {
    expect(detectPattern("2112.bit")).toEqual(["ABBA", "10K", "4D", "Digit"]);
  });
  it("'45555.bit' to be ['ABBBB', '100K', '5D', 'Digit']", () => {
    expect(detectPattern("45555.bit")).toEqual([
      "ABBBB",
      "100K",
      "5D",
      "Digit",
    ]);
  });
  it("'888000.bit' to be ['AAABBB', '6D', 'Digit']", () => {
    expect(detectPattern("888000.bit")).toEqual(["AAABBB", "6D", "Digit"]);
  });
  it("'8880000.bit' to be ['Digit']", () => {
    expect(detectPattern("8880000.bit")).toEqual(["Digit"]);
  });
});

describe("detectPattern from special number", () => {
  it("'0098.bit' to be ['00XX','10K', '4D', 'Digit']", () => {
    expect(detectPattern("0098.bit")).toEqual(["00XX", "10K", "4D", "Digit"]);
  });
  it("'0x9832.bit' to be [0x10K', 'Digit']", () => {
    expect(detectPattern("0x9832.bit")).toEqual(["0x10K", "Digit"]);
  });
});

describe("detectPattern from  letter", () => {
  it("'DDD.bit' to be ['LetterAAA']", () => {
    expect(detectPattern("DDD.bit")).toEqual(["LetterAAA"]);
  });
  it("'DID.bit' to be ['LetterABA']", () => {
    expect(detectPattern("DID.bit")).toEqual(["LetterABA"]);
  });
});
