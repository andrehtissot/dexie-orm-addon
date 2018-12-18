export const addCaptureStackTrace = (exception) => {
    if (Error.captureStackTrace) {
        Error.captureStackTrace(exception, exception.constructor)
    }
}

export default addCaptureStackTrace
