var compositeObjectStoreKeysIsSupported = () => {
    return new Promise((resolve) => {
        const db = new Dexie('CompositeObjectStoreKeysSupportTest', { addons: [ DexieORMAddon ] })
        db.version(0.1).stores({ testObjectStore: '[k1+k2]' })
        db.open().then(() => {
            db.testObjectStore.put({ k1: 1, k2: 2 }).then(() => {
                db.close()
                Dexie.delete('CompositeObjectStoreKeysSupportTest')
                compositeObjectStoreKeysIsSupported = () => (Promise.resolve(true))
                resolve(true)
            }).catch(() => {
                db.close()
                Dexie.delete('CompositeObjectStoreKeysSupportTest')
                compositeObjectStoreKeysIsSupported = () => (Promise.resolve(false))
                resolve(false)
            })
        })
    })
}

export default function doesSupportCompositeObjectStoreKeys(){
    return compositeObjectStoreKeysIsSupported()
}
