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

export default function handleOpenedDatabases(db) {
    if(Dexie.openedDatabases === undefined) {
        Dexie.openedDatabases = new Map()
    }
    Dexie.openedDatabases.set(db.name, db)

    db.close = Dexie.override(db.close, (close) => {
        return () => {
            Dexie.openedDatabases.delete(db.name)
            return close.apply(this, arguments);
        }
    })
}
