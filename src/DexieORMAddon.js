import generateModel from './generateModel'
import Boolean from './attributeTypes/Boolean'
import Character from './attributeTypes/Character'
import DateTime from './attributeTypes/DateTime'
import Integer from './attributeTypes/Integer'
import Number from './attributeTypes/Number'
import String from './attributeTypes/String'
import ObjectType from './attributeTypes/ObjectType'
import addCollectionMethods from './addCollectionMethods'
import addTableMethods from './addTableMethods'

export const AttributeTypes = { Boolean, Character, DateTime, Integer, Number, ObjectType, String }

export default function DexieORMAddon(db) {
    db.Model = generateModel(db)
    db.AttributeTypes = AttributeTypes
    addCollectionMethods(db)
    addTableMethods(db)
}

// Dexie.addons.push(DexieORMAddon)
