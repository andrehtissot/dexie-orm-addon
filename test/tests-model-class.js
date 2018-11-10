import asyncTest from "./helper-functions/asyncTest"
import newDatabase, {newTestDatabaseName} from "./helper-functions/newDatabase"
import {deleteAllDatabasesWhenDone} from "./helper-functions/deleteAllDatabases"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone()

module("new Dexie(dbName).Model")

test("attribute Model holds an object", ( assert ) => {
    assert.equal(typeof Dexie, 'function', 'Dexie is accessible as a class')
    const dbName = newTestDatabaseName(),
        db = new Dexie(dbName, { addons: [ DexieORMAddon ] })
    assert.equal(typeof db.Model, 'function', 'db.Model is accessible as a class')
})

module("(extend (new Dexie(dbName).Model)).constructor()")

test("extend, but dont implement any method or attribute", ( assert ) => {
    const { Model } = newDatabase()
    class EmptyModelTest extends Model {}
    assert.equal(EmptyModelTest.objectStoreName, 'EmptyModelTest', 'Calling EmptyModelTest.objectStoreName returns the overwritten value')
    assert.throws(() => EmptyModelTest.attributesTypes, /get attributesTypes\(\) must be implemented in the extending class/, 'get attributesTypes() must be implemented in the extending class')
    assert.throws(() => EmptyModelTest.primaryKeys, /get attributesTypes\(\) must be implemented in the extending class/, 'get attributesTypes() must be implemented in the extending class')
    assert.throws(() => EmptyModelTest.relatesTo, /get relatesTo\(\) must be implemented in the extending class/, 'get relatesTo() must be implemented in the extending class')
    assert.throws(() => Model.attributesTypes, /get attributesTypes\(\) should only be called from a class that extends Model/, 'get attributesTypes() should only be called from a class that extends Model')
    assert.throws(() => Model.primaryKeys, /get primaryKeys\(\) should only be called from a class that extends Model/, 'get primaryKeys() should only be called from a class that extends Model')
    assert.throws(() => Model.relatesTo, /get relatesTo\(\) should only be called from a class that extends Model/, 'get relatesTo() should only be called from a class that extends Model')
    assert.throws(() => { new Model() }, /Model should never be instatiated directly/, 'Model should never be instatiated directly')
})

test("extend, implement and override methods and attributes", ( assert ) => {
    const { AttributeTypes, Model } = newDatabase()
    class Person extends Model {}
    const attributes = [
            [ 'id', AttributeTypes.Integer, { min: 1 } ],
            [ 'name', AttributeTypes.String, { minLength: 1 } ]
        ],
        relationship = {
            person: ['all', 'name', Person, 'name']
        }
    class ModelTest1 extends Model {
        static get primaryKeys() {
            return [ 'name' ]
        }
        static get objectStoreName() {
            return 'ObjectStoreTest1'
        }
        static get attributesTypes() {
            return attributes
        }
        static get relatesTo() {
            return relationship
        }
    }
    assert.equal(ModelTest1.objectStoreName, 'ObjectStoreTest1', 'get objectStoreName() should be overwrittable')
    assert.deepEqual(ModelTest1.primaryKeys, [ 'name' ], 'get primaryKeys() should be overwrittable')
    assert.deepEqual(ModelTest1.attributesTypes, attributes, 'get attributesTypes() should be overwrittable')
    assert.deepEqual(ModelTest1.relatesTo, relationship, 'get attributesTypes() should be overwrittable')
})

module("(extend (new Dexie(dbName).Model)).primaryKeys")

test("Calling primaryKeys directly from Model", ( assert ) => {
    const { Model } = newDatabase()
    assert.throws(() => (Model.primaryKeys), /get primaryKeys\(\) should only be called from a class that extends Model/, 'get primaryKeys() should only be called from a class that extends Model')
})

test("default primary key should be first attribute defined", ( assert ) => {
    const { AttributeTypes, Model } = newDatabase()
    class ModelTest1 extends Model {
        static get objectStoreName() {
            return 'ObjectStoreTest1'
        }
        static get attributesTypes() {
            return [
                [ 'name', AttributeTypes.String, { minLength: 1 } ],
                [ 'id', AttributeTypes.Integer, { min: 1 } ]
            ]
        }
    }
    assert.deepEqual(ModelTest1.primaryKeys, [ 'name' ], 'name is the primary key if the first defined attribute is name')
    class ModelTest2 extends Model {
        static get objectStoreName() {
            return 'ObjectStoreTest2'
        }
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    assert.deepEqual(ModelTest2.primaryKeys, [ 'id' ], 'id is the primary key if the first defined attribute is id')
})

module("(extend (new Dexie(dbName).Model)).attributesNames")

test("Calling attributesNames directly from Model", ( assert ) => {
    const { Model } = newDatabase()
    assert.throws(() => (Model.attributesNames), /get attributesNames\(\) should only be called from a class that extends Model/, 'get attributesNames() should only be called from a class that extends Model')
})

test("recover attributes names", ( assert ) => {
    const { AttributeTypes, Model } = newDatabase()
    class ModelTest1 extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    assert.equal(typeof ModelTest1.attributesNames, 'object', 'get attributesNames() should return an object')
    assert.ok(Array.isArray(ModelTest1.attributesNames), 'get attributesNames() should return a valid array')
    assert.deepEqual(ModelTest1.attributesNames, [ 'id', 'name' ], 'get attributesNames() should return [id,name]')
})

module("(extend (new Dexie(dbName).Model)).data")

asyncTest("Calling first directly from Model", async ( assert, asyncDone ) => {
    const { Model } = newDatabase()
    try {
        const modelData = Model.data
        assert.ok(false, 'data() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'data() should only be called from a class that extends Model', 'data() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("geting the data should retrieve the model's table dexie object", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
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
    assert.equal(ModelTest.objectStoreName, 'ObjectStoreTest', 'get objectStoreName() should be overwrittable')
    assert.equal(ModelTest.data, db.ObjectStoreTest, "Dexie's desired table object should be accessible by (Model class).data, allowing the return to be class objects instead of only stored data")
})

module("(extend (new Dexie(dbName).Model)).data.firstInstance()")

asyncTest("Calling first directly from Model", async ( assert, asyncDone ) => {
    const { Model } = newDatabase()
    try {
        await Model.data.firstInstance()
        assert.ok(false, 'Model.data.firstInstance() should throw an exception')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'data() should only be called from a class that extends Model', 'data() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("simple find first", async ( assert ) => {
    let user1 = { id: 1, name: 'Test User 1' },
        user2 = { id: 2, name: 'Test User 2' }
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    db.on("populate", () => {
        db.ObjectStoreTest.add( user1 )
        db.ObjectStoreTest.add( user2 )
    })
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
    assert.equal(ModelTest.objectStoreName, 'ObjectStoreTest', 'get objectStoreName() should be overwrittable')
    const record = await ModelTest.data.firstInstance()
    assert.ok(record instanceof ModelTest, 'return from ModelTest.data.firstInstance() is an instance of ModelTest')
    assert.deepEqual(record.attributes, user1, 'returned instance from ModelTest.data.firstInstance() has the attributes as previously defined')
})

asyncTest("find first when objectStore is empty", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model, Migrations } = db
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
    assert.equal(ModelTest.objectStoreName, 'ObjectStoreTest', 'get objectStoreName() should be overwrittable')
    assert.deepEqual(await ModelTest.data.firstInstance(), undefined, 'returned instance should be undefined, since is a valid result when there is no record to retrieve')
})

module("(extend (new Dexie(dbName).Model)).data.first()")

asyncTest("Calling firstData directly from Model", async ( assert, asyncDone ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    try {
        await Model.data.first()
        assert.ok(false, 'data() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'data() should only be called from a class that extends Model', 'data() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("simple find first", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        user1 = { id: 1, name: 'Test User 1' },
        user2 = { id: 2, name: 'Test User 2' }
    db.on("populate", () => {
        db.ObjectStoreTest.add( user1 )
        db.ObjectStoreTest.add( user2 )
    })
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
    assert.deepEqual(await ModelTest.data.first(), user1, 'returned object from ModelTest.data.first() has the values previously defined')
})

asyncTest("find first when objectStore is empty", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
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
    assert.deepEqual(await ModelTest.data.first(), undefined, 'returned object from ModelTest.data.first() has no values when there is no record to retrieve')
})

module("(extend (new Dexie(dbName).Model)).data.lastInstance()")

asyncTest("Calling last directly from Model", async ( assert, asyncDone ) => {
    const { Model } = newDatabase()
    try {
        await Model.data.lastInstance()
        assert.ok(false, 'data() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'data() should only be called from a class that extends Model', 'data() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("simple find last", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        user1 = { id: 1, name: 'Test User 1' },
        user2 = { id: 2, name: 'Test User 2' }
    db.on("populate", () => {
        db.ObjectStoreTest.add( user1 )
        db.ObjectStoreTest.add( user2 )
    });
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
    assert.equal(ModelTest.objectStoreName, 'ObjectStoreTest')
    const record = await ModelTest.data.lastInstance()
    assert.ok(record instanceof ModelTest, 'record should be an instance of ModelTest')
    assert.deepEqual(record.attributes, user2, 'attributes of retrieved record should be as previously defined')
})

asyncTest("find last when objectStore is empty", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
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
    assert.deepEqual(await ModelTest.data.lastInstance(), undefined, 'returned instance should be undefined, since is a valid result when there is no record to retrieve')
})

module("(extend (new Dexie(dbName).Model)).data.last()")

asyncTest("Calling lastData directly from Model", async ( assert, asyncDone ) => {
    const { AttributeTypes, Model } = newDatabase()
    try {
        await Model.data.last()
        assert.ok(false, 'data() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'data() should only be called from a class that extends Model', 'data() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("simple find last", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db,
        user1 = { id: 1, name: 'Test User 1' },
        user2 = { id: 2, name: 'Test User 2' }
    db.on("populate", () => {
        db.ObjectStoreTest.add( user1 )
        db.ObjectStoreTest.add( user2 )
    });
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
    assert.deepEqual(await ModelTest.data.last(), user2, 'returned instance from ModelTest.data.last() has the values as previously defined')
})

asyncTest("find last when objectStore is empty", async ( assert ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
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
    assert.deepEqual(await ModelTest.data.last(), undefined, 'returned object from ModelTest.data.last() has no values when there is no record to retrieve')
})

module("(extend (new Dexie(dbName).Model)).saveData()")

asyncTest("Calling saveData directly from Model", async ( assert, asyncDone ) => {
    const { Model } = newDatabase()
    try {
        await Model.saveData([{ id: 1, name: 'Test 1' }])
        assert.ok(false, 'async saveData() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'async saveData() should only be called from a class that extends Model', 'async saveData() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("saving four valid new records", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    assert.equal(typeof ModelTest.saveData, 'function', 'saveData() is accessible as a static method')
    const savePromise = ModelTest.saveData(records),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'saveData() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'saveData() returns a Promise (2nd check)')
    assert.ok(didItSave, 'async save() should return true')
    assert.equal(await db.ModelTest.count(), 4, 'should persist the 4 records')
})

asyncTest("Calling saveData when the store object is unreachable from Model", async ( assert, asyncDone ) => {
    const db = newDatabase(),
        { AttributeTypes, Model } = db
    class ModelTest extends Model {
        static get attributesTypes() {
            return [
                [ 'id', AttributeTypes.Integer, { min: 1 } ],
                [ 'name', AttributeTypes.String, { minLength: 1 } ]
            ]
        }
    }
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    try {
        await ModelTest.saveData(records),
        assert.ok(false, "Model's ObjectStore doesn't exist in this database")
        asyncDone()
    } catch(e) {
        assert.equal(e.message, "Model's ObjectStore doesn't exist in this database", "Model's ObjectStore doesn't exist in this database")
        asyncDone()
    }
}, { autoDone: false })

asyncTest("failing to save four records, due to an invalid", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    records[2].name = ''
    assert.equal(typeof ModelTest.saveData, 'function', 'saveData() is accessible as a static method')
    const savePromise = ModelTest.saveData(records),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'saveData() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'saveData() returns a Promise (2nd check)')
    assert.notOk(didItSave, 'async save() should return false')
    assert.equal(await db.ModelTest.count(), 0, 'should not persist the records')
})

asyncTest("saving four valid or invalid new records with force", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    records[2].name = ''
    assert.equal(typeof ModelTest.saveData, 'function', 'saveData() is accessible as a static method')
    const savePromise = ModelTest.saveData(records, { force: true }),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'saveData() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'saveData() returns a Promise (2nd check)')
    assert.ok(didItSave, 'async save() should return true')
    assert.equal(await db.ModelTest.count(), 4, 'should persist the 4 records')
})

module("(extend (new Dexie(dbName).Model)).save()")

asyncTest("Calling save directly from Model", async ( assert, asyncDone ) => {
    const { Model } = newDatabase()
    try {
        await Model.save([{ id: 1, name: 'Test 1' }])
        assert.ok(false, 'async save() should only be called from a class that extends Model')
        asyncDone()
    } catch(e) {
        assert.equal(e.message, 'async save() should only be called from a class that extends Model', 'async save() should only be called from a class that extends Model')
        asyncDone()
    }
}, { autoDone: false })

asyncTest("saving four valid new records", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( new ModelTest( { id: i, name: 'Test '+i } ) )
    }
    assert.equal(typeof ModelTest.save, 'function', 'save() is accessible as a static method')
    const savePromise = ModelTest.save(records),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'save() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'save() returns a Promise (2nd check)')
    assert.ok(didItSave, 'async save() should return true')
    assert.equal(await db.ModelTest.count(), 4, 'should persist the 4 records')
})

asyncTest("failing to save four records, due to an invalid", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( new ModelTest( { id: i, name: 'Test '+i } ) )
    }
    records[2].name = ''
    assert.equal(typeof ModelTest.save, 'function', 'save() is accessible as a static method')
    const savePromise = ModelTest.save(records),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'save() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'save() returns a Promise (2nd check)')
    assert.notOk(didItSave, 'async save() should return false')
    assert.equal(await db.ModelTest.count(), 0, 'should not persist the records')
})

asyncTest("saving four valid or invalid new records with force", async ( assert ) => {
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
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( new ModelTest( { id: i, name: 'Test '+i } ) )
    }
    records[2].name = ''
    assert.equal(typeof ModelTest.save, 'function', 'save() is accessible as a static method')
    const savePromise = ModelTest.save(records, { force: true }),
        didItSave = await savePromise
    assert.equal(typeof savePromise.then, 'function', 'save() returns a Promise (1st check)')
    assert.equal(typeof savePromise.catch, 'function', 'save() returns a Promise (2nd check)')
    assert.ok(didItSave, 'async save() should return true')
    assert.equal(await db.ModelTest.count(), 4, 'should persist the 4 records')
})
