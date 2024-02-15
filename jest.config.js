module.exports = {
  modulePathIgnorePatterns: ["/package", "/storybook"],
  testEnvironment: "jsdom",
  transform: {
    "\\.m?js$": "babel-jest",
  },
  testTimeout: 30000,
};
