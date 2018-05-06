export default class DirectInstantiationOfModelException extends Error {
    constructor(ignoredMessage, ...params) {
        super("Model should never be instatiated directly", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
