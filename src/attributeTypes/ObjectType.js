const ObjectType = {
    validate: (value, options) => {
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        if(typeof value !== 'object') {
            return 'is not an Object'
        }
        if(value !== null || options !== undefined && options.allowNull === true) {
            return true
        }
        return 'is null'
    }
}

export default ObjectType