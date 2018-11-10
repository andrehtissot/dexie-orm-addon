const ObjectType = {
    validate: (value, options = { require: false, allowNull: false }) => {
        if(value === undefined && (!options || options.require !== true)) {
            return true
        }
        if(typeof value !== 'object') {
            return 'is not an Object'
        }
        if(value !== null || (options && options.allowNull === true)) {
            return true
        }
        return 'is null'
    }
}

export default ObjectType