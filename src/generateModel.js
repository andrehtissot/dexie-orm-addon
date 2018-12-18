import DirectMehodCallToModelException from './exceptions/DirectMehodCallToModelException'
import DirectInstantiationOfModelException from './exceptions/DirectInstantiationOfModelException'
import ModelsObjectStoreDoestExistException from './exceptions/ModelsObjectStoreDoestExistException'
import MethodMustBeImplementedException from './exceptions/MethodMustBeImplementedException'

const privateData = new WeakMap()

const extractPrimaryKeyValues = instance => {
    const primaryKeys = instance.constructor.primaryKeys
    if (primaryKeys.length === 1) {
        return instance[primaryKeys[0]]
    }
    return primaryKeys.map(pk => instance[pk])
}

const setAttribute = (instance, attributesValues, attrName) => {
    if (attributesValues[attrName] !== undefined) {
        instance[attrName] = attributesValues[attrName]
    }
}

const setAttributes = (instance, attributesValues) => {
    if (typeof attributesValues === 'object') {
        for (let attrName of instance.constructor.attributesNames) {
            setAttribute(instance, attributesValues, attrName)
        }
    }
}

const getPrimaryKeyValuesFromPrivateDataOrExtract = instance => {
    let primaryKeyValues = privateData.get(instance).persistedPrimarykeys
    if (primaryKeyValues === undefined) {
        return extractPrimaryKeyValues(instance)
    }
    return primaryKeyValues
}

const areRecordDataValid = (modelClass, record) => {
    const attributesTypes = modelClass.attributesTypes
    for (let [attributeName, attributeTypeObject, validationOptions] of attributesTypes) {
        if (attributeTypeObject.validate(record[attributeName], validationOptions) !== true) {
            return false
        }
    }
}

const areRecordsDataValid = (modelClass, records) => {
    for (let record of records) {
        if (areRecordDataValid(modelClass, record) === false) {
            return false
        }
    }
    return true
}

const checkObjectStoreExistence = objectStore => {
    if (objectStore === undefined) {
        throw new ModelsObjectStoreDoestExistException()
    }
}

const forbidDirectCallingToModel = (staticObject, methodName) => {
    if (staticObject === BaseModel || staticObject.name === 'Model') {
        throw new DirectMehodCallToModelException(methodName)
    }
}

const validateAttribute = (
    instance,
    invalidAttributes,
    attributesNames,
    [attributeName, attributeTypeObject, validationOptions]
) => {
    if (attributesNames.includes(attributeName)) {
        const validationMessage = attributeTypeObject.validate(instance[attributeName], validationOptions)
        if (validationMessage !== true) {
            invalidAttributes.set(attributeName, validationMessage)
        }
    }
}

// Returns a promise. The related instance is returned when promise is done.
const fetchFirst = (relatedModelClass, relatedModelAttributeName, attributeValue) => {
    return relatedModelClass.data
        .where(relatedModelAttributeName)
        .equals(attributeValue)
        .firstInstance()
}

// Returns a promise. The related instance is returned when promise is done.
const fetchLast = (relatedModelClass, relatedModelAttributeName, attributeValue) => {
    return relatedModelClass.data
        .where(relatedModelAttributeName)
        .equals(attributeValue)
        .reverse()
        .firstInstance()
}

// Returns a dexie collection from the related model.
const fetchAll = (relatedModelClass, relatedModelAttributeName, attributeValue) => {
    return relatedModelClass.data.where(relatedModelAttributeName).equals(attributeValue)
}

export class BaseModel {
    static get data() {
        forbidDirectCallingToModel(this, 'data()')
        this.db[this.objectStoreName].model = this
        return this.db[this.objectStoreName]
    }

    static get primaryKeys() {
        forbidDirectCallingToModel(this, 'get primaryKeys()')
        // Default primary key is the first attribute defined
        return [this.attributesTypes[0][0]]
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
        return this.attributesTypes.map(a => a[0])
    }

    static async saveData(records, options = { force: false }) {
        forbidDirectCallingToModel(this, 'async saveData()')
        checkObjectStoreExistence(this.db[this.objectStoreName])
        if (!options.force && !areRecordsDataValid(this, records)) {
            return false
        }
        await this.db[this.objectStoreName].bulkPut(records)
        return true
    }

    static async save(records, options = { force: false }) {
        forbidDirectCallingToModel(this, 'async save()')
        checkObjectStoreExistence(this.db[this.objectStoreName])
        if (!options.force && !areRecordsDataValid(this, records)) {
            return false
        }
        const didSave = await this.saveData(records, options)
        if (didSave) {
            for (let record of records) {
                privateData.get(record).persistedPrimarykeys = extractPrimaryKeyValues(record)
            }
        }
        return didSave
    }

    constructor(attributesValues, options = { persisted: false }) {
        if (this.constructor.name === 'Model') {
            throw new DirectInstantiationOfModelException()
        }
        setAttributes(this, attributesValues)
        if (options.persisted === true) {
            privateData.set(this, {
                persistedPrimarykeys: extractPrimaryKeyValues(this),
            })
        } else {
            privateData.set(this, {})
        }
    }

    get attributes() {
        const attributes = {}
        for (let attrName of this.constructor.attributesNames) {
            if (this[attrName] !== undefined) {
                attributes[attrName] = this[attrName]
            }
        }
        return attributes
    }

    validate(attributesNamesToValidate) {
        const attributesTypes = this.constructor.attributesTypes,
            invalidAttributes = new Map(),
            attributesNames =
                attributesNamesToValidate === undefined ? this.constructor.attributesNames : attributesNamesToValidate
        for (let attributeType of attributesTypes) {
            validateAttribute(this, invalidAttributes, attributesNames, attributeType)
        }
        return invalidAttributes
    }

    get isValid() {
        const attributesTypes = this.constructor.attributesTypes
        for (let [attributeName, attributeTypeObject, validationOptions] of attributesTypes) {
            if (attributeTypeObject.validate(this[attributeName], validationOptions) !== true) {
                return false
            }
        }
        return true
    }

    async save(options = { force: false }) {
        checkObjectStoreExistence(this.constructor.db[this.constructor.objectStoreName])
        if (!options.force && !this.isValid) {
            return false
        }
        privateData.get(this).persistedPrimarykeys = extractPrimaryKeyValues(this)
        if (privateData.get(this).persistedPrimarykeys === undefined) {
            await this.constructor.db[this.constructor.objectStoreName].add(this.attributes)
        } else {
            await this.constructor.db[this.constructor.objectStoreName].put(this.attributes)
        }
        return true
    }

    async delete() {
        checkObjectStoreExistence(this.constructor.db[this.constructor.objectStoreName])
        const primaryKeyValues = getPrimaryKeyValuesFromPrivateDataOrExtract(this)
        if (primaryKeyValues === undefined) {
            return false
        }
        await this.constructor.db[this.constructor.objectStoreName].delete(primaryKeyValues)
        return true
    }

    async reload() {
        checkObjectStoreExistence(this.constructor.db[this.constructor.objectStoreName])
        const primaryKeyValues = getPrimaryKeyValuesFromPrivateDataOrExtract(this)
        if (primaryKeyValues === undefined) {
            return false
        }
        const attributesValues = await this.constructor.db[this.constructor.objectStoreName].get(primaryKeyValues)
        if (attributesValues === undefined) {
            return false
        }
        setAttributes(this, attributesValues)
        return true
    }

    fetch(relationshipName) {
        checkObjectStoreExistence(this.constructor.db[this.constructor.objectStoreName])
        if (this.constructor.relatesTo[relationshipName] === undefined) {
            return undefined
        }
        const [
            relationshipType,
            internalAttibuteName,
            relatedModelClass,
            relatedModelAttributeName,
        ] = this.constructor.relatesTo[relationshipName]
        switch (relationshipType) {
            case 'one':
            case 'first':
                return fetchFirst(relatedModelClass, relatedModelAttributeName, this[internalAttibuteName])
            case 'last':
                return fetchLast(relatedModelClass, relatedModelAttributeName, this[internalAttibuteName])
            case 'all':
                return fetchAll(relatedModelClass, relatedModelAttributeName, this[internalAttibuteName])
        }
    }
}

export const generateModel = db => {
    const Model = class Model extends BaseModel {
        static get db() {
            return db
        }
    }
    return Model
}

export default generateModel
