/*!
 * Dexie ORM Wrapper {version} ({date})
 * https://github.com/andrehtissot/dexie-orm-wrapper
 *
 * Requires Dexie IndexedDB Wrapper
 * http://dexie.org
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 */

export default class ModelsObjectStoreDoestExistException extends Error {
    constructor(custonMessage, ...params) {
        super("Model's ObjectStore doesn't exist in this database", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
