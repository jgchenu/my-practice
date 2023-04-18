import { add } from '../add';

describe('test add.ts', () => {
  test('add should get right result', () => {
    expect(add(1, 2)).toBe(3);
  });
});
