function validateMinAndMaxLength(value, options) {
    if(options === undefined) {
        return
    }
    if(options.minLength !== undefined && value.length < options.minLength) {
        throw "has it's length is lower than mininum"
    }
    if(options.maxLength !== undefined && value.length > options.maxLength) {
        throw "has it's length is higher than maximum"
    }
}

function validateType(value) {
    if(typeof value !== 'string') {
        throw 'is not a String'
    }
}

const String = {
    validate: (value, options = { require: false }) => {
        if(value !== undefined || options.require === true) {
            try {
                validateType(value)
                validateMinAndMaxLength(value, options)
            } catch(e) {
                return e
            }
        }
        return true
    }
}

export default String