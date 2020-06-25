module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/../../jest.base.setup.ts'],
    setupFiles: ['jest-canvas-mock'],
};
