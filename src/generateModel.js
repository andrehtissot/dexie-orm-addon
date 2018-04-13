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
            if(attributesValues[attrName] !== undefined) {
                instance[attrName] = attributesValues[attrName]
            }
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
        for(let [ attributeName, attributeTypeObject, validationOptions ] of attributesTypes) {
            if(attributeTypeObject.validate(record[attributeName], validationOptions) !== true) {
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
    const Model = class Model {
        static get data() {
            forbidDirectCallingToModel(this, 'data()')
            db[this.objectStoreName].model = this
            return db[this.objectStoreName]
        }

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

        static get relatesTo() {
            forbidDirectCallingToModel(this, 'get relatesTo()')
            // Default objectStore has no attributes
            throw new MethodMustBeImplementedException('get relatesTo()')
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

        static async save(records, options = { force: false }) {
            forbidDirectCallingToModel(this, 'async save()')
            checkObjectStoreExistence(db[this.objectStoreName])
            if(!options.force && !areRecordsDataValid(this, records)) {
                return false
            }
            const didSave = await this.saveData(records, options)
            if (didSave) {
                for(let record of records) {
                    privateData.get(record).persistedPrimarykeys = extractPrimaryKeyValues(record)
                }
            }
            return didSave
        }

        constructor(attributesValues, options = { persisted: false }) {
            if (this.constructor === Model) {
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

        validate(attributesNamesToValidate) {
            const attributesTypes = this.constructor.attributesTypes,
                invalidAttributes = new Map(),
                attributesNames = attributesNamesToValidate === undefined
                    ? this.constructor.attributesNames
                    : attributesNamesToValidate
            for(let [ attributeName, attributeTypeObject, validationOptions ] of attributesTypes) {
                if(attributesNames.includes(attributeName)){
                    const validationMessage = attributeTypeObject.validate(this[attributeName], validationOptions)
                    if(validationMessage !== true) {
                        invalidAttributes.set(attributeName, validationMessage)
                    }
                }
            }
            return invalidAttributes
        }

        get isValid() {
            const attributesTypes = this.constructor.attributesTypes
            for(let [ attributeName, attributeTypeObject, validationOptions ] of attributesTypes) {
                if(attributeTypeObject.validate(this[attributeName], validationOptions) !== true) {
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

        fetch(relationshipName) {
            checkObjectStoreExistence(db[this.constructor.objectStoreName])
            if(this.constructor.relatesTo[relationshipName] === undefined) {
                return undefined
            }
            const [ relationshipType, internalAttibuteName, relatedModelClass, relatedModelAttributeName ] = this.constructor.relatesTo[relationshipName]
            switch(relationshipType){
                case 'one':
                case 'first':
                    // Returns a promise. The related instance is returned when promise is done.
                    return relatedModelClass.data.where(relatedModelAttributeName).equals(this[internalAttibuteName]).firstInstance()
                case 'last':
                    // Returns a promise. The related instance is returned when promise is done.
                    return relatedModelClass.data.where(relatedModelAttributeName).equals(this[internalAttibuteName]).reverse().firstInstance()
                case 'all':
                    // Returns a dexie collection from the related model.
                    return relatedModelClass.data.where(relatedModelAttributeName).equals(this[internalAttibuteName])
            }
        }
    }

    function forbidDirectCallingToModel(staticObject, methodName){
        if(staticObject === Model) {
            throw new DirectMehodCallToModelException(methodName)
        }
    }
    return Model
}