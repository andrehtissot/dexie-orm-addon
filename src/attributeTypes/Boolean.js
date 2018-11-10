const Boolean = {
    validate: (value, options = { require: false }) => {
        if(value === true || value === false) {
            return true
        }
        if(value === undefined && (!options || options.require !== true)) {
            return true
        }
        return 'is not a Boolean'
    }
}

export default Boolean