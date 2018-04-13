/*!
 * Dexie ORM Addon {version} ({date})
 * https://github.com/andrehtissot/dexie-orm-addon
 *
 * Requires Dexie IndexedDB Addon
 * http://dexie.org
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 */

const String = {
    validate: (value, options) => {
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        if(typeof value !== 'string') {
            return 'is not a String'
        }
        if(options !== undefined) {
            if(options.minLength !== undefined && value.length < options.minLength) {
                return "has it's length is lower than mininum"
            }
            if(options.maxLength !== undefined && value.length > options.maxLength) {
                return "has it's length is higher than maximum"
            }
        }
        return true
    }
}

export default String