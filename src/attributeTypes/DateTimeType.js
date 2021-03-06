import validateMinAndMax from './validateMinAndMax'

const validateType = (value, options) => {
    if (!(value instanceof Date) && (value !== undefined || (options && options.require === true))) {
        throw 'is not a Date'
    }
}

const DateTime = {
    validate: (value, options = { require: false }) => {
        try {
            validateType(value, options)
            if (value instanceof Date) {
                validateMinAndMax(value, options)
            }
        } catch (e) {
            return e
        }
        return true
    },
}

export default DateTime
