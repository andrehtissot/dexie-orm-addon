import addCaptureStackTrace from './addCaptureStackTrace'

export default class ModelsObjectStoreDoestExistException extends Error {
    constructor(ignoredMessage, ...params) {
        super("Model's ObjectStore doesn't exist in this database", ...params)
        addCaptureStackTrace(this)
    }
}