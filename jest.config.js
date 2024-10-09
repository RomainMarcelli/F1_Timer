module.exports = {
  preset: 'ts-jest',  
  testEnvironment: 'node', 
  testMatch: ['**/?(*.)+(spec|test).[t]s'], 
  moduleFileExtensions: ['ts', 'js', 'json', 'node'],
  transform: {
    '^.+\\.ts$': 'ts-jest', 
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'], 
};
