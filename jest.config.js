module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}',
    '!<rootDir>/src/main/**/*',
    '!<rootDir>/src/presentation/components/router/**/*',
    '!<rootDir>/src/presentation/pages/error/**/*',
    '!<rootDir>/src/**/index.ts',
    '!**/*.d.ts'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
    '\\.scss$': 'identity-obj-proxy'
  }
}
