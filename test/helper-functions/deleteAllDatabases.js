import {done} from 'QUnit'

export default async function deleteAllDatabases() {
    const databasesName = await Dexie.getDatabaseNames()
    for(let datanaseName of databasesName) {
        if(Dexie.openedDatabases.has(datanaseName)) {
            Dexie.openedDatabases.get(datanaseName).close()
        }
    }
    for(let datanaseName of databasesName) {
        Dexie.delete(datanaseName)
    }
}

var shouldDeleteAllDatabasesWhenDone = false
export function deleteAllDatabasesWhenDone() {
    shouldDeleteAllDatabasesWhenDone = true
}

var shouldDeleteAllDatabasesWhenDoneCanceled = false
export function cancelDeleteAllDatabasesWhenDone(){
    shouldDeleteAllDatabasesWhenDoneCanceled = true
}

done(() => {
    if(!shouldDeleteAllDatabasesWhenDoneCanceled && shouldDeleteAllDatabasesWhenDone){
        deleteAllDatabases()
    }
})