export default function generateExceptionClass(message) {
    return class generatedExceptionClass extends Error {
        constructor(ignoredMessage, ...params) {
            super(message, ...params);
            if (Error.captureStackTrace) {
                Error.captureStackTrace(this, this.constructor);
            }
        }
    }
}


