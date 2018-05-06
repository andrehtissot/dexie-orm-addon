import validateMinAndMax from './validateMinAndMax'

function validateType(value, options) {
    if(!(value instanceof Date) && (value !== undefined || options.require === true)) {
        throw 'is not a Date'
    }
}

const DateTime = {
    validate: (value, options = { require: false }) => {
        try {
            validateType(value, options)
            if(value instanceof Date) {
                validateMinAndMax(value, options)
            }
        } catch(e) {
            return e
        }
        return true
    }
}

export default DateTime