const Number = {
    validate: (value, options) => {
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        if(typeof value !== 'number') {
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