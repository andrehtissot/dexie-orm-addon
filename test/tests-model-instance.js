import asyncTest from "./helper-functions/asyncTest"
import newDatabase from "./helper-functions/newDatabase"
import {deleteAllDatabasesWhenDone} from "./helper-functions/deleteAllDatabases"
import doesSupportCompositeObjectStoreKeys from "./helper-functions/doesSupportCompositeObjectStoreKeys"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

module("(new (extend (new Dexie(dbName).Model))).attributes")

test("recover data as object", ( assert ) => {
    const { AttributeTypes, Model } = newDatabase()
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.attributes, 'object', 'the "attributes" attribute should return an object')
    instance.id = 1
    instance.name = "Test"
    assert.deepEqual(instance.attributes, { id: 1, name: 'Test'}, 'the "attributes" attribute should return an object with the previous defined values')
})

module("(new (extend (new Dexie(dbName).Model))).validate()")

asyncTest("simple validation test", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        recordsData = [
            { id: 0, name: 'invalid id' },
            { id: 'string id', name: 23 },
            { id: 2, name: new Date() },
            { id: 3, name: 'Valid name and id' }
        ]
    db.version(1).stores({ ObjectStoreTest: 'id,name' })
    class ModelTest extends Model {
        static get objectStoreName() {
            return 'ObjectStoreTest'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instances = [],
        validations = []
    for(let i in recordsData) {
        instances[i] = new ModelTest(recordsData[i])
        validations[i] = {
            forId: instances[i].validate( [ 'id' ] ),
            forName: instances[i].validate( [ 'name' ] ),
            forBoth: instances[i].validate( [ 'id', 'name' ] ),
            forAll: instances[i].validate()
        }
    }

    // For record 0
    assert.equal(validations[0].forName.size, 0, 'For { record:0, validation:forName } the size of validation should be 0')
    for(let validationFilter of ['forId', 'forBoth', 'forAll']) {
        assert.equal(validations[0][validationFilter].size, 1, 'For { record:0, fields:'+validationFilter+' } the size of validation should be 1')
        assert.ok(validations[0][validationFilter].has('id'), 'For { record:0, fields:'+validationFilter+' } has "id" in validation result')
        assert.equal(validations[0][validationFilter].get('id'), 'is lower than mininum', 'For { record:0, fields:'+validationFilter+' } has "id" validation message = "is lower than mininum"')
    }

    // For record 1
    assert.equal(validations[1].forId.size, 1, 'For { record:1, validation:forId } the size of validation should be 1')
    assert.ok(validations[1].forId.has('id'), 'For { record:1, fields:forId } has "id" in validation result')
    assert.equal(validations[1].forId.get('id'), 'is not an Integer', 'For { record:1, fields:forId } has "id" validation message = "is not an Integer"')
    assert.equal(validations[1].forName.size, 1, 'For { record:1, validation:forName } the size of validation should be 1')
    assert.ok(validations[1].forName.has('name'), 'For { record:1, fields:forName } has "name" in validation result')
    assert.equal(validations[1].forName.get('name'), 'is not a String', 'For { record:1, fields:forName } has "name" validation message = "is not a String"')
    for(let validationFilter of ['forBoth', 'forAll']) {
        assert.equal(validations[1][validationFilter].size, 2, 'For { record:1, validation:'+validationFilter+' } the size of validation should be 2')
        assert.ok(validations[1][validationFilter].has('id'), 'For { record:1, fields:'+validationFilter+' } has "id" in validation result')
        assert.ok(validations[1][validationFilter].has('name'), 'For { record:1, fields:'+validationFilter+' } has "name" in validation result')
        assert.equal(validations[1][validationFilter].get('id'), 'is not an Integer', 'For { record:1, fields:'+validationFilter+' } has "id" validation message = "is not an Integer"')
        assert.equal(validations[1][validationFilter].get('name'), 'is not a String', 'For { record:1, fields:'+validationFilter+' } has "name" validation message = "is not a String"')
    }

    // For record 2
    assert.equal(validations[2].forId.size, 0, 'For { record:2, validation:forId } the size of validation should be 0')
    for(let validationFilter of ['forName', 'forBoth', 'forAll']) {
        assert.equal(validations[2][validationFilter].size, 1, 'For { record:2, validation:'+validationFilter+' } the size of validation should be 1')
        assert.ok(validations[2][validationFilter].has('name'), 'For { record:2, fields:'+validationFilter+' } has "name" in validation result')
        assert.equal(validations[2][validationFilter].get('name'), 'is not a String', 'For { record:2, fields:'+validationFilter+' } has "name" validation message = "is not a String"')
    }

    // For record 3
    for(let validationFilter of ['forId', 'forName', 'forBoth', 'forAll']) {
        assert.equal(validations[3][validationFilter].size, 0, 'For { record:3, validation:'+validationFilter+' } the size of validation should be 0')
    }
})

module("(new (extend (new Dexie(dbName).Model))).isValid")

asyncTest("simple bool validation test", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        recordsData = [
            { id: 0, name: 'invalid id' },
            { id: 'string id', name: 23 },
            { id: 2, name: new Date() },
            { id: 3, name: 'Valid name and id' }
        ]
    db.version(1).stores({ ObjectStoreTest: 'id,name' })
    class ModelTest extends Model {
        static get objectStoreName() {
            return 'ObjectStoreTest'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    for (let i = 0; i < 3; i++) {
        const instance = new ModelTest(recordsData[i])
        assert.notOk(instance.isValid, 'instance '+i+' should not be valid')
    }
    const instance = new ModelTest(recordsData[3])
    assert.ok(instance.isValid, 'instance 3 should be valid')
})

module("(new (extend (new Dexie(dbName).Model))).save()")

asyncTest("saving a simple valid new record", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.save, 'function', 'instance.save is accessible as a function')
    instance.id = 1
    instance.name = "Test"
    const savePromise = instance.save(),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'async save() returns a promise (check 1)')
    assert.equal(typeof savePromise.catch, 'function', 'async save() returns a promise (check 2)')
    assert.ok(didItSave, 'async save() should save successfully, returning true')
    assert.equal(instance.id, 1, "Instance's id value shouldn't change after save")
    assert.equal(instance.name, 'Test', "Instance's name value shouldn't change after save")
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.deepEqual(foundInstances, [ { id: 1, name: 'Test' } ], 'the record retrieved should be equal to previously defined')
    }
})

asyncTest("saving a simple invalid new record fails", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.save, 'function', 'instance.save is accessible as a function')
    instance.id = 0
    instance.name = "Test"
    const savePromise = instance.save(),
        didItSave = await savePromise

    assert.equal(typeof savePromise.then, 'function', 'async save() returns a promise (check 1)')
    assert.equal(typeof savePromise.catch, 'function', 'async save() returns a promise (check 2)')
    assert.notOk(didItSave, 'async save() should not save successfully, returning false')
    assert.equal(instance.id, 0, "Instance's id value shouldn't change after trying to save")
    assert.equal(instance.name, 'Test', "Instance's name value shouldn't change after trying to save")
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.equal(foundInstances.length, 0, 'the objectStore should be empty')
    }
})

asyncTest("saving a simple invalid new record works if forced", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.save, 'function', 'instance.save is accessible as a function')
    instance.id = 0
    instance.name = "Test"
    const savePromise = instance.save({ force: true }),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'async save() returns a promise (check 1)')
    assert.equal(typeof savePromise.catch, 'function', 'async save() returns a promise (check 2)')
    assert.ok(didItSave, 'async save() should save forcefully, returning true')
    assert.equal(instance.id, 0, "Instance's id value shouldn't change after save")
    assert.equal(instance.name, 'Test', "Instance's name value shouldn't change after save")
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.deepEqual(foundInstances, [ { id: 0, name: 'Test' } ], 'the record retrieved should be equal to previously defined')
    }
})

asyncTest("saving a simple valid previous existing record", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.save, 'function', 'instance.save is accessible as a function')
    instance.id = 1
    instance.name = "Test"
    let savePromise = instance.save()
    let didItSave = await savePromise
    instance.id = 1
    instance.name = "Test updated!"
    assert.ok(didItSave, 'async save() should insert successfully, returning true')
    savePromise = instance.save()
    didItSave = await savePromise
    assert.ok(didItSave, 'async save() should update successfully, returning true')
    assert.equal(instance.id, 1, "Instance's id value shouldn't change after save")
    assert.equal(instance.name, 'Test updated!', "Instance's name value shouldn't change after save")
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.deepEqual(foundInstances, [ { id: 1, name: 'Test updated!' } ], 'the record retrieved should be equal to previously defined')
    }
})

asyncTest("duplicate record changing its default primary key value", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: 'id,name' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest()
    assert.equal(typeof instance.save, 'function', 'instance.save is accessible as a function')
    instance.id = 1
    instance.name = "Test"
    let didItSave = await instance.save()
    instance.id = 2
    instance.name = "Test"
    assert.ok(didItSave, 'async save() should insert successfully, returning true')
    didItSave = await instance.save()
    assert.ok(didItSave, 'async save() should insert successfully, returning true')
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.deepEqual(foundInstances, [ { id: 1, name: 'Test' }, { id: 2, name: 'Test' } ], 'the record retrieved should be equal to previously defined')
    }
})

asyncTest("duplicating record changing its composite primary key attributes and values", async ( assert ) => {
    if(!(await doesSupportCompositeObjectStoreKeys())) {
        // For some browsers, like Internet Explorer, Edge and Safari (< v10), there is no support for composite primary keys.
        assert.ok(true, 'Current browser does not support composite primary keys')
        return
    }
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: '[id+code]' })
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'code', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest(),
        variants = []
    for(let id of [1, 2, 3]) {
        for(let code of ['A', 'B', 'C']) {
            instance.id = id
            instance.code = code
            variants.push( { id: id, code: code } )
            assert.ok(await instance.save(), 'should save '+JSON.stringify(instance.attributes)+' successfully')
        }
    }
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should be accessible as a valid objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.deepEqual(foundInstances, variants, 'the record retrieved should be equal to previously defined')
    }
})

module("(new (extend (new Dexie(dbName).Model))).delete()")

asyncTest("simple delete", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        user1 = { id: 1, name: 'Test User 1' },
        user2 = { id: 2, name: 'Test User 2' }
    db.version(1).stores({ ObjectStoreTest: 'id,name' })
    db.on("populate", () => {
        db.ObjectStoreTest.bulkAdd([user1, user2])
    })
    class ModelTest extends Model {
        static get objectStoreName() {
            return 'ObjectStoreTest'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    for(let expectedRecord of [user2, user1]) {
        const record = await ModelTest.data.lastInstance()
        assert.notEqual(record, undefined, 'record should not be undefined')
        assert.notEqual(record, null, 'record should not be null')
        assert.ok(record instanceof ModelTest, 'record is a instance of ModelTest')
        assert.deepEqual(record.attributes, expectedRecord, 'object attributes are equal to the original object')
        assert.equal(record.id, expectedRecord.id, 'id is equal')
        assert.equal(record.name, expectedRecord.name, 'name is equal')
        assert.equal(typeof record.delete, 'function', 'model instances should have a delete method')
        if(typeof record.delete === 'function') {
            const deletePromise = record.delete()
            assert.ok(typeof deletePromise.then === 'function' && typeof deletePromise.catch === 'function', 'delete() should return a promise')
            assert.ok(await deletePromise, 'calling delete() should return true only if it had the primary keys filled')
        }
    }
    const record = await ModelTest.data.lastInstance()
    assert.equal(record, null, 'there is no records to return')
})

asyncTest("delete for composite primary key", async ( assert ) => {
    if(!(await doesSupportCompositeObjectStoreKeys())) {
        // For some browsers, like Internet Explorer, Edge and Safari (< v10), there is no support for composite primary keys.
        assert.ok(true, 'Current browser does not support composite primary keys')
        return
    }
    assert.expect(30)
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ ModelTest: '[id+code]' })
    class ModelTest extends Model {
        static get primaryKeys() {
            return [ 'id', 'code' ]
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'code', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const instance = new ModelTest(),
        variants = []
    for(let id of [1, 2, 3]) {
        for(let code of ['A', 'B', 'C']) {
            instance.id = id
            instance.code = code
            variants.push( { id: id, code: code } )
            assert.ok(await instance.save(), 'saving '+JSON.stringify(instance.attributes)+' should be successful')
        }
    }
    assert.equal(typeof db.ModelTest, 'object', 'ModelTest should exist as objectStore')
    if(typeof db.ModelTest === 'object') {
        const foundInstances = await db.ModelTest.toArray()
        assert.equal(foundInstances.length, 9, 'should find all 9 saved records')
        assert.deepEqual(foundInstances, variants, 'saved records should be found just as saved')
    }
    for (var i = 8; i >= 0; i--) {
        const savedInstance = await ModelTest.data.lastInstance()
        assert.deepEqual(savedInstance.attributes, variants[i], 'last record should be '+JSON.stringify(variants[i])+' in the iteration '+i)
        assert.ok(await savedInstance.delete(), 'should be able to delete record '+i+' ('+
            JSON.stringify(savedInstance.attributes)+')')
    }
})

module("(new (extend (new Dexie(dbName).Model))).reload()")

asyncTest("simple reload", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ users: 'id,name' })
    class User extends Model {
        static get objectStoreName() {
            return 'users'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const userData = { id: 1, name: 'user name' },
        userInstance = new User(userData)
    assert.ok(await userInstance.save(), 'save() should be successful')
    userInstance.name = 'testing'
    userInstance.id = 2
    assert.equal(userInstance.name, 'testing', 'name should be changable in memory')
    assert.equal(userInstance.id, 2, 'id should be changable in memory')
    assert.ok(await userInstance.reload(), 'reload() should be successful')
    assert.equal(userInstance.name, 'user name', 'name should be changed to saved value')
    assert.equal(userInstance.id, 1, 'id should be changed to saved value')
})

asyncTest("reload when record is not currently in the database", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ users: 'id,name' })
    class User extends Model {
        static get objectStoreName() {
            return 'users'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const userData = { id: 1, name: 'user name' },
        userInstance = new User(userData)
    userInstance.name = 'testing'
    userInstance.id = 2
    assert.equal(userInstance.name, 'testing', 'name should be changable in memory')
    assert.equal(userInstance.id, 2, 'id should be changable in memory')
    assert.notOk(await userInstance.reload(), 'reload() should not be successful')
    assert.equal(userInstance.name, 'testing', 'if the name was not persisted, should not be reloadable')
    assert.equal(userInstance.id, 2, 'if the id was not persisted, should not be reloadable')
})

asyncTest("reload after a record was delete", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ users: 'id,name' })
    class User extends Model {
        static get objectStoreName() {
            return 'users'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const userData = { id: 1, name: 'user name' },
        userInstance = new User(userData)
    assert.ok(await userInstance.save(), 'save() should be successful')
    userInstance.name = 'testing'
    userInstance.id = 2
    assert.equal(userInstance.name, 'testing', 'name should be changable in memory')
    assert.equal(userInstance.id, 2, 'id should be changable in memory')
    assert.ok(await userInstance.delete(), 'delete() should be successful')
    assert.notOk(await userInstance.reload(), 'reload() should not be successful since it is not persisted anymore')
    assert.equal(userInstance.name, 'testing', 'name should be changed to saved value')
    assert.equal(userInstance.id, 2, 'id should be changed to saved value')
})

asyncTest("reload the record has composite primary keys", async ( assert ) => {
    if(!(await doesSupportCompositeObjectStoreKeys())) {
        // For some browsers, like Internet Explorer, Edge and Safari (< v10), there is no support for composite primary keys.
        assert.ok(true, 'Current browser does not support composite primary keys')
        return
    }
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.version(1).stores({ users: '[id+name]' })
    class User extends Model {
        static get primaryKeys() {
            return [ 'id', 'name' ]
        }
        static get objectStoreName() {
            return 'users'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const userData = { id: 1, name: 'user name' },
        userInstance = new User(userData)
    assert.ok(await userInstance.save(), 'save() should be successful')
    userInstance.name = 'testing'
    userInstance.id = 2
    assert.equal(userInstance.name, 'testing', 'name should be changable in memory')
    assert.equal(userInstance.id, 2, 'id should be changable in memory')
    assert.ok(await userInstance.reload(), 'reload() should be successful')
    assert.equal(userInstance.name, 'user name', 'name should be changed to saved value')
    assert.equal(userInstance.id, 1, 'id should be changed to saved value')
})
