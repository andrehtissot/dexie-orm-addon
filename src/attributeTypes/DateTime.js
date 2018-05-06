import validateMinAndMax from './validateMinAndMax'

const DateTime = {
    validate: (value, options) => {
        if(!(value instanceof Date) && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not a Date'
        }
        if(value instanceof Date) {
            try {
                validateMinAndMax(value, options)
            } catch(e) {
                return e
            }
        }
        return true
    }
}

export default DateTime