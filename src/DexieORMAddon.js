import generateModel from './generateModel'
import BooleanType from './attributeTypes/BooleanType'
import CharacterType from './attributeTypes/CharacterType'
import DateTimeType from './attributeTypes/DateTimeType'
import IntegerType from './attributeTypes/IntegerType'
import NumberType from './attributeTypes/NumberType'
import StringType from './attributeTypes/StringType'
import ObjectType from './attributeTypes/ObjectType'
import addCollectionMethods from './addCollectionMethods'
import addTableMethods from './addTableMethods'

export const DexieORMAddon = (db) => {
    db.Model = generateModel(db)
    db.BooleanType = BooleanType
    db.CharacterType = CharacterType
    db.DateTimeType = DateTimeType
    db.IntegerType = IntegerType
    db.NumberType = NumberType
    db.ObjectType = ObjectType
    db.StringType = StringType
    addCollectionMethods(db)
    addTableMethods(db)
}

export default DexieORMAddon

// Dexie.addons.push(DexieORMAddon)
