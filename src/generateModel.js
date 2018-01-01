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

import DirectMehodCallToModelException from './exceptions/DirectMehodCallToModelException'
import DirectInstantiationOfModelException from './exceptions/DirectInstantiationOfModelException'
import ModelsObjectStoreDoestExistException from './exceptions/ModelsObjectStoreDoestExistException'
import MethodMustBeImplementedException from './exceptions/MethodMustBeImplementedException'

const privateData = new WeakMap()

function extractPrimaryKeyValues(instance) {
    const primaryKeys = instance.constructor.primaryKeys
    if(primaryKeys.length === 1) {
        return instance[primaryKeys[0]]
    }
    return primaryKeys.map((pk) => instance[pk])
}

function setAttributes(instance, attributesValues) {
    if(typeof attributesValues === 'object') {
        for(let attrName of instance.constructor.attributesNames) {
            instance[attrName] = attributesValues[attrName]
        }
    }
}

function getPrimaryKeyValuesFromPrivateDataOrExtract(instance){
    let primaryKeyValues = privateData.get(instance).persistedPrimarykeys
    if(primaryKeyValues === undefined) {
        return extractPrimaryKeyValues(instance)
    }
    return primaryKeyValues
}

function areRecordsDataValid(modelClass, records) {
    const attributesTypes = modelClass.attributesTypes
    for(let record of records) {
        for(let attributeType of attributesTypes) {
            if(attributeType[1].validate(record[attributeType[0]], attributeType[2]) !== true) {
                return false
            }
        }
    }
    return true
}

function checkObjectStoreExistence(objectStore){
    if(objectStore === undefined) {
        throw new ModelsObjectStoreDoestExistException()
    }
}

export default function generateModel(db) {
    const Model = class Model extends  {
        static async first() {
            forbidDirectCallingToModel(this, 'async first()')
            checkObjectStoreExistence(db[this.objectStoreName])
            const data = await db[this.objectStoreName].toCollection().first()
            return (data === undefined) ? null : new this(data, { persisted: true })
        }

        static async firstData() {
            forbidDirectCallingToModel(this, 'async firstData()')
            checkObjectStoreExistence(db[this.objectStoreName])
            const data = await db[this.objectStoreName].toCollection().first()
            return (data === undefined) ? {} : data
        }

        static async last() {
            forbidDirectCallingToModel(this, 'async last()')
            checkObjectStoreExistence(db[this.objectStoreName])
            const data = await db[this.objectStoreName].toCollection().last()
            return (data === undefined) ? null : new this(data, { persisted: true })
        }

        static async lastData() {
            forbidDirectCallingToModel(this, 'async lastData()')
            const data = await db[this.objectStoreName].toCollection().last()
            return (data === undefined) ? {} : data
        }

        // static find() {
        //     forbidDirectCallingToModel(this, 'find()')
        //     return new DORMWQuery(Connection, this)
        // }

        static get primaryKeys() {
            forbidDirectCallingToModel(this, 'get primaryKeys()')
            // Default primary key is the first attribute defined
            return [ this.attributesTypes[0][0] ]
        }

        static get objectStoreName() {
            forbidDirectCallingToModel(this, 'get objectStoreName()')
            // Default objectStore name is the classe's name
            return this.name
        }

        static get attributesTypes() {
            forbidDirectCallingToModel(this, 'get attributesTypes()')
            // Default objectStore has no attributes
            throw new MethodMustBeImplementedException('get attributesTypes()')
        }

        static get attributesNames() {
            forbidDirectCallingToModel(this, 'get attributesNames()')
            return this.attributesTypes.map((a) => a[0])
        }

        static async saveData(records, options = { force: false }) {
            forbidDirectCallingToModel(this, 'async saveData()')
            checkObjectStoreExistence(db[this.objectStoreName])
            if(!options.force && !areRecordsDataValid(this, records)) {
                return false
            }
            await db[this.objectStoreName].bulkPut(records)
            return true
        }

    //     static async save(records, options = { force: false }) {
    //         let attributes = new Array(records.length)
    //         for (let i = records.length - 1; i >= 0; i--) {
    //             attributes[i] = records[i].attributes
    //         }
    //         const didSave = await this.saveData(records, options)
    //         if (didSave) {
    //             for(let record of records) {
    //                 privateData.get(record).persistedPrimarykeys = extractPrimaryKeyValues(record)
    //             }
    //         }
    //         return didSave
    //     }

        constructor(attributesValues, options = { persisted: false }) {
            if (new.target === Model) {
              throw new DirectInstantiationOfModelException();
            }
            setAttributes(this, attributesValues)
            if(options.persisted === true) {
                privateData.set(this, {
                    persistedPrimarykeys: extractPrimaryKeyValues(this)
                })
            } else {
                privateData.set(this, {})
            }
        }

        get attributes() {
            const attributes = {}
            for(let attrName of this.constructor.attributesNames) {
                attributes[attrName] = this[attrName]
            }
            return attributes
        }

        validateAttributes(attributesNamesToValidate) {
            const attributesTypes = this.constructor.attributesTypes,
                invalidAttributes = new Map(),
                attributesNames = attributesNamesToValidate === undefined
                    ? this.constructor.attributesNames
                    : attributesNamesToValidate
            for(let attributeType of attributesTypes) {
                if(attributesNames.includes(attributeType[0])){
                    const validationMessage = attributeType[1].validate(this[attributeType[0]], attributeType[2])
                    if(validationMessage !== true) {
                        invalidAttributes.set(attributeType[0], validationMessage)
                    }
                }
            }
            return invalidAttributes
        }

        get isValid() {
            const attributesTypes = this.constructor.attributesTypes
            for(let attributeType of attributesTypes) {
                if(attributeType[1].validate(this[attributeType[0]], attributeType[2]) !== true) {
                    return false
                }
            }
            return true
        }

        async save(options = { force: false }) {
            checkObjectStoreExistence(db[this.constructor.objectStoreName])
            if( !options.force && !this.isValid ) {
                return false
            }
            privateData.get(this).persistedPrimarykeys = extractPrimaryKeyValues(this)
            // primary key definition is optional
            await db[this.constructor.objectStoreName].put(this.attributes)
            return true
        }

        async delete() {
            checkObjectStoreExistence(db[this.constructor.objectStoreName])
            const primaryKeyValues = getPrimaryKeyValuesFromPrivateDataOrExtract(this)
            if(primaryKeyValues === undefined) {
                return false
            }
            await db[this.constructor.objectStoreName].delete(primaryKeyValues)
            return true
        }

        async reload() {
            checkObjectStoreExistence(db[this.constructor.objectStoreName])
            const primaryKeyValues = getPrimaryKeyValuesFromPrivateDataOrExtract(this)
            if(primaryKeyValues === undefined) {
                return false
            }
            const attributesValues = await db[this.constructor.objectStoreName].get(primaryKeyValues)
            if(attributesValues === undefined) {
                return false
            }
            setAttributes(this, attributesValues)
            return true
        }
    }

    function forbidDirectCallingToModel(staticObject, methodName){
        if(staticObject === Model) {
            throw new DirectMehodCallToModelException(methodName)
        }
    }
    return Model
}