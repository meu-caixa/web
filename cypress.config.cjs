const {defineConfig} = require('cypress');

module.exports = defineConfig({
    env: {
        codeCoverage: {
            exclude: 'cypress/**/*',
        },
    },
    e2e: {
        setupNodeEvents(on, config) {
            require('@cypress/code-coverage/task')(on, config);
            return config;
        },
        baseUrl: 'http://localhost:5173',
    },
});
