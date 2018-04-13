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

const Boolean = {
    validate: (value, options) => {
        if(value === true || value === false) {
            return true
        }
        if(value === undefined && (options === undefined || options.require !== true)) {
            return true
        }
        return 'is not a Boolean'
    }
}

export default Boolean