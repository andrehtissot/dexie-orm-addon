const String = {
    validate: (value, options = { require: false }) => {
        if(value !== undefined || options.require === true) {
            if(typeof value !== 'string') {
                return 'is not a String'
            }
            if(options !== undefined) {
                if(options.minLength !== undefined && value.length < options.minLength) {
                    return "has it's length is lower than mininum"
                }
                if(options.maxLength !== undefined && value.length > options.maxLength) {
                    return "has it's length is higher than maximum"
                }
            }
        }
        return true
    }
}

export default String