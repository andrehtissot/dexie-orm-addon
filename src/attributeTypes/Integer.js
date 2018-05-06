const Integer = {
    validate: (value, options) => {
        if(!Number.isInteger(value) && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not an Integer'
        }
        if(options !== undefined) {
            if(options.min !== undefined && value < options.min) {
                return 'is lower than mininum'
            }
            if(options.max !== undefined && value > options.max) {
                return 'is higher than maximum'
            }
        }
        return true
    }
}

export default Integer