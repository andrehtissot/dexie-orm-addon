import {asyncTest, deleteAllDatabasesWhenDone, newDatabase, newModulesAndSimpleExampleQueryWithEmptyQueryResult} from "./helper-functions"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

async function newModulesAndSimpleExampleQuery() {
    const { db, ModelTest, modelTestData } = await newModulesAndSimpleExampleQueryWithEmptyQueryResult()
    const records = []
    for (let i = 1; i < 5; i++) {
        records.push( { id: i, name: 'Test '+i } )
    }
    await ModelTest.saveData(records, { force: true })
    return { db, ModelTest, modelTestData }
}

module("(extend (new Dexie(dbName).Model)).data.where()")

asyncTest("the Query generated returns an object with a method where()", async ( assert ) => {
    const { modelTestData } = await newModulesAndSimpleExampleQuery()
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