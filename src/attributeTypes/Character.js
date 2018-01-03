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

const Character = {
    validate: (value, options) => {
        if(typeof value !== 'string' || value.length !== 1) {
            return 'is not a Character'
        }
        return true
    }
}

export default Character