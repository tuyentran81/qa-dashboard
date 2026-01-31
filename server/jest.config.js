export default {
    testEnvironment: 'node',
    transform: {},
    moduleFileExtensions: ['js', 'json'],
    testMatch: ['**/tests/**/*.test.js'],
    collectCoverageFrom: [
        'controllers/**/*.js',
        'services/**/*.js',
        'routes/**/*.js',
        'db/connection.js'
    ],
    coverageThreshold: {
        global: {
            branches: 70,
            functions: 70,
            lines: 70,
            statements: 70
        }
    }
};
