const Character = {
    validate: (value, options) => {
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        if(typeof value !== 'string' || value.length !== 1) {
            return 'is not a Character'
        }
        return true
    }
}

export default Character