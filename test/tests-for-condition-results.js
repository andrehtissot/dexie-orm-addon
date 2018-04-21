import asyncTest from "./helper-functions/asyncTest"
import newDatabase from "./helper-functions/newDatabase"
import {deleteAllDatabasesWhenDone} from "./helper-functions/deleteAllDatabases"
import newModulesAndSimpleExampleClass from "./helper-functions/newModulesAndSimpleExampleClass"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

async function newModulesAndSimpleExampleClassWithData() {
    const { db, ModelTest, modelTestData } = await newModulesAndSimpleExampleClass()
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    await ModelTest.saveData(records, { force: true })
    return { db, ModelTest, modelTestData }
}

module("(extend (new Dexie(dbName).Model)).data.getInstance()")

asyncTest("the method getInstance() should return a valid instance of ModelTest", async ( assert ) => {
    const { modelTestData, ModelTest } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.getInstance, 'function', 'result should have the method "getInstance"')
    for (let i = 1; i < 5; i++) {
        const instanceFound = await modelTestData.getInstance(i)
        assert.ok(instanceFound instanceof ModelTest, 'The object returned should be an instance of ModelTest')
        assert.deepEqual(instanceFound.attributes, { id: i, name: 'Test '+i })
    }
})

asyncTest("the method getInstance() should return undefined if there is no record with that value as primary key", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.getInstance, 'function', 'result should have the method "getInstance"')
    assert.equal(await modelTestData.getInstance(0), undefined, 'getInstance(0) should be undefined')
    assert.equal(await modelTestData.getInstance(5), undefined, 'getInstance(5) should be undefined')
    assert.equal(await modelTestData.getInstance(99), undefined, 'getInstance(99) should be undefined')
    assert.equal(await modelTestData.getInstance(-1), undefined, 'getInstance(-1) should be undefined')
    assert.equal(await modelTestData.getInstance('string key'), undefined, 'getInstance(\'string key\') should be undefined')
})

module("(extend (new Dexie(dbName).Model)).data.toCollection().sortInstancesBy()")

asyncTest("where() returns a Dexie WhereClause that can be used to retrieve sorted instances", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.where, 'function', 'result should have the method "where"')
    const resultAsArray = await modelTestData.where('id').anyOf([2,3]).or('name').equals('Test 4').sortBy('id')
    assert.ok(Array.isArray(resultAsArray), 'toArray() returns a valid Array')
    assert.deepEqual(resultAsArray, [
        { id: 2, name: 'Test 2' },
        { id: 3, name: 'Test 3' },
        { id: 4, name: 'Test 4' }
    ])
    const resultAsInstancesArray = await modelTestData.where('id').anyOf([2,3]).or('name').equals('Test 4').sortInstancesBy('id')
    assert.ok(Array.isArray(resultAsInstancesArray), 'toArray() returns a valid Array')
    assert.deepEqual(resultAsInstancesArray[0].attributes, { id: 2, name: 'Test 2' })
    assert.deepEqual(resultAsInstancesArray[1].attributes, { id: 3, name: 'Test 3' })
    assert.deepEqual(resultAsInstancesArray[2].attributes, { id: 4, name: 'Test 4' })
})

