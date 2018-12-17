export default function addCaptureStackTrace(exception) {
    if (Error.captureStackTrace) {
        Error.captureStackTrace(exception, exception.constructor)
    }
}
