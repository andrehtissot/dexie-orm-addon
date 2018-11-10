const isAValidUndefined = (value, options) => (value === undefined && (!options || options.require !== true))
const isAValidNull = (value, options) => (value !== null || (options && options.allowNull === true))
const isTypeObject = (value) => (typeof value !== 'object')

const ObjectType = {
    validate: (value, options = { require: false, allowNull: false }) => {
        if(isAValidUndefined(value, options)) {
            return true
        }
        if(isTypeObject(value)) {
            return 'is not an Object'
        }
        if(isAValidNull(value, options)) {
            return true
        }
        return 'is null'
    }
}

export default ObjectType