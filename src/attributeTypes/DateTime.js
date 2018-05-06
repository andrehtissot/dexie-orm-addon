const DateTime = {
    validate: (value, options) => {
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        if(value instanceof Date) {
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
        return 'is not a Date'
    }
}

export default DateTime