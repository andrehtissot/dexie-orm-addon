import validateMinAndMax from './validateMinAndMax'

const Number = {
    validate: (value, options = { require: false }) => {
        if (typeof value !== 'number' && (value !== undefined || (options && options.require === true))) {
            return 'is not a Number'
        }
        try {
            validateMinAndMax(value, options)
        } catch (e) {
            return e
        }
        return true
    },
}

export default Number
