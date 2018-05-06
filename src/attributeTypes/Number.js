import validateMinAndMax from './validateMinAndMax'

const Number = {
    validate: (value, options) => {
        if(typeof value !== 'number' && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not a Number'
        }
        try {
            validateMinAndMax(value, options)
        } catch(e) {
            return e
        }
        return true
    }
}

export default Number