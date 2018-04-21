import asyncTest from "./helper-functions/asyncTest"
import newDatabase from "./helper-functions/newDatabase"
import {deleteAllDatabasesWhenDone} from "./helper-functions/deleteAllDatabases"
import newModulesAndSimpleExampleClass from "./helper-functions/newModulesAndSimpleExampleClass"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

async function newModulesAndSimpleExampleClassWithData() {
    const { db, ModelTest, modelTestData } = await newModulesAndSimpleExampleClass()
    await new ModelTest({ id: 1, name: 'Test 1' }).save({ force: true })
    await new ModelTest({ id: 2, name: 'Test 2' }).save({ force: true })
    return { db, ModelTest, modelTestData }
}

module("(extend (new Dexie(dbName).Model)).data")

test("Calling data() directly from Model", ( assert ) => {
    const { Model } = newDatabase()
    assert.equal(typeof Model, 'function', 'Model should be accessible as a class')
    assert.throws(() => { Model.data }, /data\(\) should only be called from a class that extends Model/, 'should throw an exception')
})

module("(extend (new Dexie(dbName).Model)).data.toArray()")

asyncTest("the Query generated returns an object with a method toArray() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toArray, 'function', 'result should have the method "toArray"')
    if(typeof modelTestData.toArray !== 'function') {
        return // prevent the code bellow to fail
    }
    const resultAsArray = await modelTestData.toArray()
    assert.ok(Array.isArray(resultAsArray), 'toArray() returns a valid Array')
    assert.deepEqual(resultAsArray, [
        { id: 1, name: 'Test 1' },
        { id: 2, name: 'Test 2' }
    ])
})

module("(extend (new Dexie(dbName).Model)).data.toCollection().toInstancesArray()")

asyncTest("the Query generated returns an object with a method toInstancesArray() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toCollection, 'function', 'result should have the method "toInstancesArray"')
    if(typeof modelTestData.toCollection !== 'function') {
        return // prevent the code bellow to fail
    }
    const collection = modelTestData.toCollection()
    assert.equal(typeof collection.toInstancesArray, 'function', 'result should have the method "toInstancesArray"')
    if(typeof collection.toInstancesArray !== 'function') {
        return // prevent the code bellow to fail
    }
    const resultAsArray = await collection.toInstancesArray()
    assert.ok(Array.isArray(resultAsArray), 'toInstancesArray() returns a valid Array')
    assert.equal(resultAsArray.length, 2, 'result array has two elements')
    assert.deepEqual(resultAsArray[0].attributes, { id: 1, name: 'Test 1' })
    assert.deepEqual(resultAsArray[1].attributes, { id: 2, name: 'Test 2' })
})

module("(extend (new Dexie(dbName).Model)).data.toInstancesArray()")

asyncTest("the Query generated returns an object with a method toInstancesArray() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toInstancesArray, 'function', 'result should have the method "toInstancesArray"')
    if(typeof modelTestData.toInstancesArray !== 'function') {
        return // prevent the code bellow to fail
    }
    const resultAsArray = await modelTestData.toInstancesArray()
    assert.ok(Array.isArray(resultAsArray), 'toInstancesArray() returns a valid Array')
    assert.equal(resultAsArray.length, 2, 'result array has two elements')
    assert.deepEqual(resultAsArray[0].attributes, { id: 1, name: 'Test 1' })
    assert.deepEqual(resultAsArray[1].attributes, { id: 2, name: 'Test 2' })
})

module("(extend (new Dexie(dbName).Model)).data.toCollection().toMapIndexedBy()")

asyncTest("the Query generated returns an object with a method toMapIndexedBy() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toCollection().toMapIndexedBy, 'function', 'result should have the method "toMapIndexedBy"')
    if(typeof modelTestData.toCollection().toMapIndexedBy !== 'function') {
        return // prevent the code bellow to fail
    }
    let resultAsMap = await modelTestData.toCollection().toMapIndexedBy('id')
    assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get(1), { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
    assert.deepEqual(resultAsMap.get(2), { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
    resultAsMap = await modelTestData.toCollection().toMapIndexedBy('name')
    assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get('Test 2'), { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
    assert.deepEqual(resultAsMap.get('Test 1'), { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
})

module("(extend (new Dexie(dbName).Model)).data.toMapIndexedBy()")

asyncTest("the Query generated returns an object with a method toMapIndexedBy() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toMapIndexedBy, 'function', 'result should have the method "toMapIndexedBy"')
    if(typeof modelTestData.toMapIndexedBy !== 'function') {
        return // prevent the code bellow to fail
    }
    let resultAsMap = await modelTestData.toMapIndexedBy('id')
    assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get(1), { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
    assert.deepEqual(resultAsMap.get(2), { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
    resultAsMap = await modelTestData.toMapIndexedBy('name')
    assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get('Test 2'), { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
    assert.deepEqual(resultAsMap.get('Test 1'), { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
})

module("(extend (new Dexie(dbName).Model)).data.toCollection().toInstancesMapIndexedBy()")

asyncTest("the Query generated returns an object with a method toInstancesMapIndexedBy() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toCollection().toInstancesMapIndexedBy, 'function', 'result should have the method "toInstancesMapIndexedBy"')
    if(typeof modelTestData.toCollection().toInstancesMapIndexedBy !== 'function') {
        return // prevent the code bellow to fail
    }
    let resultAsMap = await modelTestData.toCollection().toInstancesMapIndexedBy('id')
    assert.ok(resultAsMap instanceof Map, 'toInstancesMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get(1).attributes, { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
    assert.deepEqual(resultAsMap.get(2).attributes, { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
    resultAsMap = await modelTestData.toCollection().toInstancesMapIndexedBy('name')
    assert.ok(resultAsMap instanceof Map, 'toInstancesMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get('Test 2').attributes, { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
    assert.deepEqual(resultAsMap.get('Test 1').attributes, { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
})

module("(extend (new Dexie(dbName).Model)).data.toInstancesMapIndexedBy()")

asyncTest("the Query generated returns an object with a method toInstancesMapIndexedBy() with all the values retrieved", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.equal(typeof modelTestData.toInstancesMapIndexedBy, 'function', 'result should have the method "toInstancesMapIndexedBy"')
    if(typeof modelTestData.toInstancesMapIndexedBy !== 'function') {
        return // prevent the code bellow to fail
    }
    let resultAsMap = await modelTestData.toInstancesMapIndexedBy('id')
    assert.ok(resultAsMap instanceof Map, 'toInstancesMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get(1).attributes, { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
    assert.deepEqual(resultAsMap.get(2).attributes, { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
    resultAsMap = await modelTestData.toInstancesMapIndexedBy('name')
    assert.ok(resultAsMap instanceof Map, 'toInstancesMapIndexedBy() returns a valid Map')
    assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
    assert.deepEqual(resultAsMap.get('Test 2').attributes, { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
    assert.deepEqual(resultAsMap.get('Test 1').attributes, { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
})

module("(extend (new Dexie(dbName).Model)).data.count")

asyncTest('the Query generated returns an object with an attribute "count" with the elements count', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        count = await modelTestData.count()
    assert.equal(typeof count, 'number', 'result should have the method "count"')
    if(typeof count !== '') {
        return // prevent the code bellow to fail
    }
    assert.equal(count, 2, 'return from "count" should be 2')
})

module("(extend (new Dexie(dbName).Model)).data.first")

asyncTest('the Query generated returns an object with an attribute "first" with the first element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData()
    assert.deepEqual(await modelTestData.first(), { id: 1, name: 'Test 1' }, "result[0] should return the first record data")
})

asyncTest('the Query generated returns an object with an attribute "first" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass()
    assert.equal(await modelTestData.first(), undefined, "result[0] should return the first record data")
})

module("(extend (new Dexie(dbName).Model)).data.toCollection().firstInstance")

asyncTest('the Query generated returns an object with an attribute "first" with the first element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        first = await modelTestData.toCollection().firstInstance()
    assert.deepEqual(first.attributes, { id: 1, name: 'Test 1' }, "result[0] should return the first record instanciated")
})

asyncTest('the Query generated returns an object with an attribute "first" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass(),
        first = await modelTestData.toCollection().firstInstance()
    assert.equal(first, undefined, "result[0] should return the first record data")
})

module("(extend (new Dexie(dbName).Model)).data.firstInstance")

asyncTest('the Query generated returns an object with an attribute "first" with the first element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        first = await modelTestData.firstInstance()
    assert.deepEqual(first.attributes, { id: 1, name: 'Test 1' }, "result[0] should return the first record instanciated")
})

asyncTest('the Query generated returns an object with an attribute "first" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass(),
        first = await modelTestData.firstInstance()
    assert.equal(first, undefined, "result[0] should return the first record data")
})

module("(extend (new Dexie(dbName).Model)).data.last")

asyncTest('the Query generated returns an object with an attribute "last" with the last element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        last = await modelTestData.last()
    assert.deepEqual(last, { id: 2, name: 'Test 2' }, "result[0] should return the last record data")
})

asyncTest('the Query generated returns an object with an attribute "last" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass(),
        last = await modelTestData.last()
    assert.deepEqual(last, undefined, "result[0] should return the last record data")
})

module("(extend (new Dexie(dbName).Model)).data.lastInstance")

asyncTest('the Query generated returns an object with an attribute "last" with the last element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        last = await modelTestData.lastInstance()
    assert.deepEqual(last.attributes, { id: 2, name: 'Test 2' }, "result[0] should return the last record instanciated")
})

asyncTest('the Query generated returns an object with an attribute "last" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass(),
        last = await modelTestData.lastInstance()
    assert.equal(last, undefined, "result[0] should return the last record data")
})

module("(extend (new Dexie(dbName).Model)).data.lastInstance")

asyncTest('the Query generated returns an object with an attribute "last" with the last element as raw object', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClassWithData(),
        last = await modelTestData.toCollection().lastInstance()
    assert.deepEqual(last.attributes, { id: 2, name: 'Test 2' }, "result[0] should return the last record instanciated")
})

asyncTest('the Query generated returns an object with an attribute "last" with the undefined if there is no records in query result', async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleClass(),
        last = await modelTestData.toCollection().lastInstance()
    assert.equal(last, undefined, "result[0] should return the last record data")
})
