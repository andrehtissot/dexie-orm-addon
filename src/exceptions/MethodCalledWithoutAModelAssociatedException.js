export default class MethodCalledWithoutAModelAssociatedException extends Error {
    constructor(ignoredMessage, ...params) {
        super("This method can only be called if this object was created from a model call", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
