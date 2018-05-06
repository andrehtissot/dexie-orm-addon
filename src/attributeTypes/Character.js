const Character = {
    validate: (value, options = { require: false }) => {
        if(value === undefined && options.require !== true) {
            return true
        }
        if(typeof value !== 'string' || value.length !== 1) {
            return 'is not a Character'
        }
        return true
    }
}

export default Character