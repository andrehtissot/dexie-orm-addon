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

import generateModel from './generateModel'
import Integer from './attributeTypes/Integer'
import Boolean from './attributeTypes/Boolean'
import String from './attributeTypes/String'
import DateTime from './attributeTypes/DateTime'

export default function dexieORMAddon(db) {
    db.Model = generateModel(db)
    db.AttributeTypes = {
        Integer: Integer,
        Boolean: Boolean,
        String: String,
        DateTime: DateTime
    }
    Dexie.openedDatabases.set(db.name, db)
}

Dexie.openedDatabases = new Map()

Dexie.addons.push(dexieORMAddon)
