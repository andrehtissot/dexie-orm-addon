const DateTime = {
    validate: (value, options) => {
        if(!(value instanceof Date) && (value !== undefined || (options !== undefined && options.require === true))) {
            return 'is not a Date'
        }
        if(value instanceof Date && options !== undefined) {
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

export default DateTime