export default class DORMWMethodMustBeImplementedException extends Error {
    constructor(functionName, ...params) {
        super(`${functionName} must be implemented in the extending class`, ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
