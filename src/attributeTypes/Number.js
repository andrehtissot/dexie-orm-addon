const Number = {
    validate: (value, options) => {
        if(typeof value !== 'number' && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not a Number'
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

export default Number