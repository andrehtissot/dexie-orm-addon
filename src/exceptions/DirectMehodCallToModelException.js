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

export default class DORMWDirectMehodCallToModelException extends Error {
    constructor(methodName, ...params) {
        super(methodName+" should only be called from a class that extends Model", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
