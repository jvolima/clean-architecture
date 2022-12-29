module.exports = {
  roots: ['<rootDir>/src'],
  transform: {
    '.+\\.(ts|tsx)$': 'ts-jest'
  },
  collectCoverageFrom: [
    '<rootDir>/src/**/*.{ts,tsx}'
  ],
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1'
  }
}
