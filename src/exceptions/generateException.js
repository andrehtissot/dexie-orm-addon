import addCaptureStackTrace from './addCaptureStackTrace'

export const generateException = treatParams => {
    return class extends Error {
        constructor(...params) {
            super(...treatParams(params))
            addCaptureStackTrace(this)
        }
    }
}

export default generateException
