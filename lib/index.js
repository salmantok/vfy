import assert from 'assert';

const mockedLogs = [];
const mockedErrors = [];

const originalConsoleLog = console.log;
const originalConsoleError = console.error;

// Mock console
console.log = (...args) => mockedLogs.push(args.join(' '));
console.error = (...args) => mockedErrors.push(args.join(' '));

const restoreConsole = () => {
    console.log = originalConsoleLog;
    console.error = originalConsoleError;
};

export const test = (expectedLogs) => {
    return new Promise((resolve, reject) => {
        try {
            assert.deepStrictEqual(
                mockedLogs,
                expectedLogs,
                'Urutan eksekusi tidak sesuai'
            );
            resolve(true);
        } catch (error) {
            reject(error);
        } finally {
            restoreConsole();
        }
    });
};
