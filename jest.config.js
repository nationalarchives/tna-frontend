module.exports = {
  modulePathIgnorePatterns: ["/package"],
  testEnvironment: "jsdom",
  transform: {
    "\\.m?js$": "babel-jest",
  },
  testTimeout: 30000,
};
