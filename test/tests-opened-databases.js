import {asyncTest, deleteAllDatabasesWhenDone, newDatabase} from "./helper-functions"
import {module, test} from 'QUnit'

deleteAllDatabasesWhenDone();

module("Dexie.openedDatabases")

asyncTest("Dexie.openedDatabases holds opened databases objects", async ( assert ) => {
    const db = newDatabase()
    assert.ok(Dexie.openedDatabases instanceof Map, 'Dexie.openedDatabases holds a Map')
    assert.equal(typeof Dexie.openedDatabases.get(db.name), 'object', 'Dexie.openedDatabases holds a Map with db instances')
    db.version(1).stores({})
    await db.open()
    Dexie.openedDatabases.get(db.name).close()
})

asyncTest("should not hold closed database connections", async ( assert ) => {
    const db = newDatabase()
    db.version(1).stores({})
    await db.open()
    assert.ok(Dexie.openedDatabases.has(db.name), 'opened database should be accessible')
    Dexie.openedDatabases.get(db.name).close()
    assert.notOk(Dexie.openedDatabases.has(db.name), 'closed database should not be accessible')
})