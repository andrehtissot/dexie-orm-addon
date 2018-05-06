export default class ModelsObjectStoreDoestExistException extends Error {
    constructor(ignoredMessage, ...params) {
        super("Model's ObjectStore doesn't exist in this database", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
