import DexieORMAddon from '../../src/DexieORMAddon'
import DexieOpenedDatabasesAddon from 'dexie-opened-databases-addon'

export function newTestDatabaseName() {
    return 'testDB'+(window.performance.timing.navigationStart+window.performance.now())
}

export default function newDatabase(options = {}) {
    let dbName = options.dbName
    if(dbName === undefined) {
        dbName = newTestDatabaseName()
    }
    return new Dexie(dbName, { addons: [ DexieORMAddon, DexieOpenedDatabasesAddon ] })
}
