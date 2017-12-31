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

export default class DirectInstantiationOfModelException extends Error {
    constructor(ignoredMessage, ...params) {
        super("Model should never be instatiated directly", ...params);
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
