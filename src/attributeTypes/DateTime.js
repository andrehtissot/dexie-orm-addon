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