import addCaptureStackTrace from './addCaptureStackTrace'

export default function generateException(treatParams) {
    return class extends Error {
        constructor(...params) {
            super(...treatParams(params))
            addCaptureStackTrace(this)
        }
    }
}
