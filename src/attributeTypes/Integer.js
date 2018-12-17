import validateMinAndMax from './validateMinAndMax'

const Integer = {
    validate: (value, options = { require: false }) => {
        if (!Number.isInteger(value) && (value !== undefined || (options && options.require === true))) {
            return 'is not an Integer'
        }
        try {
            validateMinAndMax(value, options)
        } catch (e) {
            return e
        }
        return true
    },
}

export default Integer
