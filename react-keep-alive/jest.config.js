const path = require('path');
const alias = require('./alias');

const parsedAlias = {};
//
Object.entries(alias).forEach(([key, val]) => {
  // key 前面有 '$' 符号, 需要转义
  const parsedKey = `${key[0] === '$' ? '\\' : ''}${key}\\/(.*)$`;
  const parsedVal = path.join(val, '$1');
  parsedAlias[parsedKey] = parsedVal;
  const parsedKey2 = `${key[0] === '$' ? '\\' : ''}${key}$`;
  parsedAlias[parsedKey2] = val;
});
module.exports = {
  cacheDirectory: './node_modules/.cache/jest',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest/jest.setup.ts'],
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  globals: {
    __DEV__: true,
    __MOCK__: true,
  },
  testPathIgnorePatterns: ['/node_modules/', '/dist/', '/scripts/'],
  collectCoverageFrom: ['src/**/*.tsx?', '!**/node_modules/**', '!**/script/**', '!**/spec/**', '!**/lib/**'],
  transform: {
    '^.+\\.tsx?$': '<rootDir>/jest/jest.transformer.js',
    '^.+\\.svg$': '<rootDir>/jest/jest-svg-transformer.js',
    '^.+\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/jest/jest.file-mock.js',
  },
  moduleNameMapper: { ...parsedAlias, 'lodash-es': 'lodash', '^.+\\.(css|less)$': 'identity-obj-proxy' },
};
