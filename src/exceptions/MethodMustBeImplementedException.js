import addCaptureStackTrace from './addCaptureStackTrace'

export default class DORMWMethodMustBeImplementedException extends Error {
    constructor(functionName, ...params) {
        super(`${functionName} must be implemented in the extending class`, ...params)
        addCaptureStackTrace(this)
    }
}
