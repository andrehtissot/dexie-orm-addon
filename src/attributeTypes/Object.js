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

const TypeObject = {
    validate: (value, options) => {
        if(typeof value !== 'object') {
            return 'is not an Object'
        }
        if(value !== null) {
            return true
        }
        if(options !== undefined && options.allowNull === true) {
            return true
        }
        return 'is null'
    }
}

export default TypeObject