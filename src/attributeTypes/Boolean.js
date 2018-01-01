/*!
 * Dexie ORM Addon {version} ({date})
 * https://github.com/andrehtissot/dexie-orm-wrapper
 *
 * Requires Dexie IndexedDB Addon
 * http://dexie.org
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 */

const Boolean = {
    validate: (value) => {
        if(value === true || value === false)
            return true
        return 'is not a Boolean'
    }
}

export default Boolean