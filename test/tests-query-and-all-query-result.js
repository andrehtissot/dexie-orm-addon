import {asyncTest, deleteAllDatabasesWhenDone, newDatabase} from "./helper-functions"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

// async function newModulesAndSimpleExampleQueryWithEmptyQueryResult() {
//     const modules = newTestModules()
//     class ModelTest extends modules.Model {
//         static get attributesTypes() {
//             return [
//                 [ 'id', modules.AttributeTypes.Integer, { min: 1 } ],
//                 [ 'name', modules.AttributeTypes.String, { minLength: 1 } ]
//             ]
//         }
//     }
//     modules.Migrations.addVersion(1, { ModelTest: 'id,name' });
//     await modules.Connection.get()
//     modules.ModelTest = ModelTest
//     modules.queryTest = ModelTest.find()
//     return modules
// }

// async function newModulesAndSimpleExampleQuery() {
//     const modules = await newModulesAndSimpleExampleQueryWithEmptyQueryResult(),
//         ModelTest = modules.ModelTest
//     await new ModelTest({ id: 1, name: 'Test 1' }).save({ force: true })
//     await new ModelTest({ id: 2, name: 'Test 2' }).save({ force: true })
//     return modules
// }

module("(extend (new Dexie(dbName).Model)).find()")

test("Calling find() directly from Model", ( assert ) => {
    const { Model } = newDatabase()
    assert.equal(typeof Model, 'function', 'Model should be accessible as a class')
    assert.throws(() => { Model.find() }, /find\(\) should only be called from a class that extends Model/, 'should throw an exception')
})

// test("Model holds a \"find\" function that returns a Query", ( assert ) => {
//     const { Model } = newTestModules()
//     class ModelTest extends Model {
//         static get attributesTypes() {
//             return [
//                 [ 'id', AttributeTypes.Integer, { min: 1 } ],
//                 [ 'name', AttributeTypes.String, { minLength: 1 } ]
//             ]
//         }
//     }
//     let collection = ModelTest.find()
//     assert.equal(typeof collection, 'object', 'Calling the static method "find" from a extended class should return an object')
//     assert.ok(collection instanceof DORMWQuery, 'Calling the static method "find" from a extended class should return a Query')
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all()")

// asyncTest("the Query generated returns a QueryResult object", async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery()
//     assert.equal(typeof queryTest.all, 'function', 'generated Query should have the method "all"')
//     if(typeof queryTest.all !== 'function') {
//         return // prevent the code bellow to fail
//     }
//     const result = await queryTest.all()
//     assert.ok(result instanceof DORMWQueryResult, 'DORMWQuery.all() should return a valid DORMWQueryResult instance')
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().toDataArray()")

// asyncTest("the Query generated returns an object with a method toDataArray() with all the values retrieved", async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(typeof result.toDataArray, 'function', 'result should have the method "toDataArray"')
//     if(typeof result.toDataArray !== 'function') {
//         return // prevent the code bellow to fail
//     }
//     const resultAsArray = result.toDataArray()
//     assert.ok(Array.isArray(resultAsArray), 'toDataArray() returns a valid Array')
//     assert.deepEqual(resultAsArray, [
//         { id: 1, name: 'Test 1' },
//         { id: 2, name: 'Test 2' }
//     ])
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().toArray()")

// asyncTest("the Query generated returns an object with a method toArray() with all the values retrieved", async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(typeof result.toArray, 'function', 'result should have the method "toArray"')
//     if(typeof result.toArray !== 'function') {
//         return // prevent the code bellow to fail
//     }
//     const resultAsArray = result.toArray()
//     assert.ok(Array.isArray(resultAsArray), 'toArray() returns a valid Array')
//     assert.equal(resultAsArray.length, 2)
//     assert.deepEqual(resultAsArray[0].attributes, { id: 1, name: 'Test 1' })
//     assert.deepEqual(resultAsArray[1].attributes, { id: 2, name: 'Test 2' })
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().toDataMapIndexedBy()")

// asyncTest("the Query generated returns an object with a method toDataMapIndexedBy() with all the values retrieved", async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(typeof result.toDataMapIndexedBy, 'function', 'result should have the method "toDataMapIndexedBy"')
//     if(typeof result.toDataMapIndexedBy !== 'function') {
//         return // prevent the code bellow to fail
//     }
//     let resultAsMap = result.toDataMapIndexedBy('id')
//     assert.ok(resultAsMap instanceof Map, 'toDataMapIndexedBy() returns a valid Map')
//     assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
//     assert.deepEqual(resultAsMap.get(1), { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
//     assert.deepEqual(resultAsMap.get(2), { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
//     resultAsMap = result.toDataMapIndexedBy('name')
//     assert.ok(resultAsMap instanceof Map, 'toDataMapIndexedBy() returns a valid Map')
//     assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
//     assert.deepEqual(resultAsMap.get('Test 2'), { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
//     assert.deepEqual(resultAsMap.get('Test 1'), { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().toMapIndexedBy()")

// asyncTest("the Query generated returns an object with a method toMapIndexedBy() with all the values retrieved", async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(typeof result.toMapIndexedBy, 'function', 'result should have the method "toMapIndexedBy"')
//     if(typeof result.toMapIndexedBy !== 'function') {
//         return // prevent the code bellow to fail
//     }
//     let resultAsMap = result.toMapIndexedBy('id')
//     assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
//     assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
//     assert.deepEqual(resultAsMap.get(1).attributes, { id: 1, name: 'Test 1' }, 'get(1) should return the first record')
//     assert.deepEqual(resultAsMap.get(2).attributes, { id: 2, name: 'Test 2' }, 'get(2) should return the second record')
//     resultAsMap = result.toMapIndexedBy('name')
//     assert.ok(resultAsMap instanceof Map, 'toMapIndexedBy() returns a valid Map')
//     assert.equal(resultAsMap.size, 2, 'map returned should have two elements')
//     assert.deepEqual(resultAsMap.get('Test 2').attributes, { id: 2, name: 'Test 2' }, "get('Test 2') should return the second record")
//     assert.deepEqual(resultAsMap.get('Test 1').attributes, { id: 1, name: 'Test 1' }, "get('Test 1') should return the first record")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().size")

// asyncTest('the Query generated returns an object with an attribute "size" with the elements count', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(typeof result.size, 'number', 'result should have the method "size"')
//     if(typeof result.size !== '') {
//         return // prevent the code bellow to fail
//     }
//     assert.equal(result.size, 2, 'return from "size" should be 2')
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().firstData")

// asyncTest('the Query generated returns an object with an attribute "firstData" with the first element as raw object', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.deepEqual(result.firstData, { id: 1, name: 'Test 1' }, "result[0] should return the first record data")
// })

// asyncTest('the Query generated returns an object with an attribute "firstData" with the undefined if there is no records in query result', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQueryWithEmptyQueryResult(),
//         result = await queryTest.all()
//     assert.equal(result.firstData, undefined, "result[0] should return the first record data")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().first")

// asyncTest('the Query generated returns an object with an attribute "first" with the first element as raw object', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.deepEqual(result.first.attributes, { id: 1, name: 'Test 1' }, "result[0] should return the first record instanciated")
// })

// asyncTest('the Query generated returns an object with an attribute "first" with the undefined if there is no records in query result', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQueryWithEmptyQueryResult(),
//         result = await queryTest.all()
//     assert.equal(result.first, undefined, "result[0] should return the first record data")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().lastData")

// asyncTest('the Query generated returns an object with an attribute "lastData" with the last element as raw object', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.deepEqual(result.lastData, { id: 1, name: 'Test 1' }, "result[0] should return the last record data")
// })

// asyncTest('the Query generated returns an object with an attribute "lastData" with the undefined if there is no records in query result', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQueryWithEmptyQueryResult(),
//         result = await queryTest.all()
//     assert.equal(result.lastData, undefined, "result[0] should return the last record data")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().last")

// asyncTest('the Query generated returns an object with an attribute "last" with the last element as raw object', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.deepEqual(result.last.attributes, { id: 1, name: 'Test 1' }, "result[0] should return the last record instanciated")
// })

// asyncTest('the Query generated returns an object with an attribute "last" with the undefined if there is no records in query result', async ( assert ) => {
//     const { queryTest } = await newModulesAndSimpleExampleQueryWithEmptyQueryResult(),
//         result = await queryTest.all()
//     assert.equal(result.last, undefined, "result[0] should return the last record data")
// })

// module("DORMWQuery<(extend (new Dexie(dbName).Model))>.all().delete()")

// asyncTest('the Query generated returns an object with a method "delete" that deletes all selected records', async ( assert ) => {
//     const { queryTest, Connection } = await newModulesAndSimpleExampleQuery(),
//         result = await queryTest.all()
//     assert.equal(result.size, 2, "Initially this query result has 2 elements (1st check)")
//     assert.equal(result.toArray().length, 2, "Initially this query result has 2 elements (2nd check)")
//     let connection = await Connection.get(),
//         count = await connection.ModelTest.count()
//     assert.equal(count, 2, "Initially it should be possible to retrieve 2 elements")
//     assert.ok(await result.delete(), 'Calling "delete" should return true if success')
//     assert.equal(result.size, 2, "After deleting the records, the elements in this query result stay 2 (1st check)")
//     assert.equal(result.toArray().length, 2, "After deleting the records, the elements in this query result stay 2 (2nd check)")
//     count = await connection.ModelTest.count()
//     assert.equal(count, 0, "After deleting the records, it shouldn't be possible to retrieve the 2 elements")
//     assert.ok(await result.delete(), 'Calling "delete" should return true, even if the records were already deleted')
//     for(let record of result.toArray()) {
//         await record.save()
//     }
//     assert.equal(result.size, 2, "After saving the records again, the elements in this query result stay 2 (1st check)")
//     assert.equal(result.toArray().length, 2, "After saving the records again, the elements in this query result stay 2 (2nd check)")
//     count = await connection.ModelTest.count()
//     assert.equal(count, 2, "After saving the records again, it should be possible to retrieve 2 elements")
//     assert.ok(await result.delete(), 'Calling "delete" should return true to delete the resutls again')
// })
