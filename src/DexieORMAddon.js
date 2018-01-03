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
import Boolean from './attributeTypes/Boolean'
import Character from './attributeTypes/Character'
import DateTime from './attributeTypes/DateTime'
import Integer from './attributeTypes/Integer'
import Number from './attributeTypes/Number'
import String from './attributeTypes/String'
import TypeObject from './attributeTypes/Object'
import handleOpenedDatabases from './handleOpenedDatabases'
import addCollectionMethods from './addCollectionMethods'
import addTableMethods from './addTableMethods'

export default function DexieORMAddon(db) {
    db.Model = generateModel(db)
    db.AttributeTypes = { Boolean, Character, DateTime, Integer, Number, Object, String }
    handleOpenedDatabases(db)
    addCollectionMethods(db)
    addTableMethods(db)
}

// Dexie.addons.push(dexieORMAddon)
