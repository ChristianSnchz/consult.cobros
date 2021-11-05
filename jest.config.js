module.exports = {
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts', 'jest-localstorage-mock'],
  globals: {
    BFF_URL: 'https://dev.apps.ocp.ar.bsch/bff/',
    GA_ID: 'UA-*********-*',
    NODE_ENV: 'development',
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.json',
      isolatedModules: true
    }
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.(ts|tsx|jsx)$': 'ts-jest',
    '^.+\\.html?$': 'html-loader-jest'
  },
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/node_modules/**',
    '!**/example/**',
    '!**/dist/**',
    '!**/mockServer/**',
    '!**/coverage/**',
    '!**/ocp/**',
    '!**/build/**',
    '!**/public/**',
    '!**/gulp/**',
    '!**/uploads/**',
    '!**/mocks/**',
    '!**/assets/**',
    '!**/styles/**',
    '!**/webpack/**',
    '!**/single-spa/**'
  ],
  moduleNameMapper: {
    '~/(.*)': '<rootDir>/src/$1',
    '\\.(jpg|jpeg|png|xlsx|gif|eot|otf|webp|ttf|woff|woff2|svg|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/__mocks__/fileMock.js',
    '\\.(scss|css|less)$': '<rootDir>/test/__mocks__/styleMock.js'
  },
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 68,
      lines: 80,
      statements: 80
    }
  },
  coverageReporters: ['json', 'lcovonly', 'text', 'html'],
  maxWorkers: 4
};
