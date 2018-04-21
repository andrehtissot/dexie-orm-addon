import DexieORMAddon from '../../src/DexieORMAddon'

var compositeObjectStoreKeysIsSupported = async () => {
    const db = new Dexie('CompositeObjectStoreKeysSupportTest', { addons: [ DexieORMAddon ] })
    db.version(0.1).stores({ testObjectStore: '[k1+k2]' })
    await db.open()
    try {
        await db.testObjectStore.put({ k1: 1, k2: 2 })
    } catch(e) {
        compositeObjectStoreKeysIsSupported = () => (Promise.resolve(false))
        return false
    }
    db.close()
    Dexie.delete('CompositeObjectStoreKeysSupportTest')
    compositeObjectStoreKeysIsSupported = () => (Promise.resolve(true))
    return true
}

export default function doesSupportCompositeObjectStoreKeys(){
    return compositeObjectStoreKeysIsSupported()
}
