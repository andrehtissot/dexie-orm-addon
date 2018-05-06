import validateMinAndMax from './validateMinAndMax'

const Integer = {
    validate: (value, options) => {
        if(!Number.isInteger(value) && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not an Integer'
        }
        try {
            validateMinAndMax(value, options)
        } catch(e) {
            return e
        }
        return true
    }
}

export default Integer