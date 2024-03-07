import type { JestConfigWithTsJest } from 'ts-jest'

const config: JestConfigWithTsJest = {
  clearMocks: true,
  testTimeout: 2000, // a low timeout causes flakey unit test results when all tests are being executed
  collectCoverageFrom: ['src/**/*'],
  coverageDirectory: './coverage',
  coverageReporters: ['clover', 'json', 'lcov', ['text', { skipFull: true }], 'json-summary'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'node',
  modulePathIgnorePatterns: ['dist'],
  testPathIgnorePatterns: ['.cache'],
  globals: {
    'ts-jest': {
      tsconfig: './tsconfig.json',
      isolatedModules: true,
    },
  },
  coverageThreshold: {
    global: {
      statements: 20,
      branches: 20,
      lines: 20,
      functions: 0,
    },
  },
}

export default config
