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

import generateModel from './generateModel'
import Integer from './attributeTypes/Integer'
import Boolean from './attributeTypes/Boolean'
import String from './attributeTypes/String'
import DateTime from './attributeTypes/DateTime'
import handleOpenedDatabases from './handleOpenedDatabases'
import addCollectionMethods from './addCollectionMethods'
import addTableMethods from './addTableMethods'

export default function DexieORMAddon(db) {
    db.Model = generateModel(db)
    db.AttributeTypes = {
        Integer: Integer,
        Boolean: Boolean,
        String: String,
        DateTime: DateTime
    }
    handleOpenedDatabases(db)
    addCollectionMethods(db)
    addTableMethods(db)
}

// Dexie.addons.push(dexieORMAddon)
