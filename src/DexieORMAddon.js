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
import handleOpenedDatabases from './handleOpenedDatabases'

export default function dexieORMAddon(db) {
    db.Model = generateModel(db)
    db.AttributeTypes = {
        Integer: Integer,
        Boolean: Boolean,
        String: String,
        DateTime: DateTime
    }
    handleOpenedDatabases(db)
}

Dexie.addons.push(dexieORMAddon)
