import addCaptureStackTrace from './addCaptureStackTrace'

export default class DORMWDirectMehodCallToModelException extends Error {
    constructor(methodName, ...params) {
        super(`${methodName} should only be called from a class that extends Model`, ...params)
        addCaptureStackTrace(this)
    }
}
