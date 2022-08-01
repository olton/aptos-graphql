export default {
  verbose: true,
  collectCoverage: true,
  "collectCoverageFrom": [
    "**/src/**/*.js",
  ],
  transform: {
    "^.+\\.(js)$": "babel-jest",
  },
  transformIgnorePatterns: [
  ],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/helpers/"]
}