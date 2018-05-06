import MethodCalledWithoutAModelAssociatedException from './exceptions/MethodCalledWithoutAModelAssociatedException'

function checkModelAssociation(model){
    if(model === undefined) {
        throw new MethodCalledWithoutAModelAssociatedException()
    }
}

const CollectionMethods = {
    toInstancesArray: async function() {
        checkModelAssociation(this._ctx.table.model)
        const arrayResult = await this.toArray(),
            model = this._ctx.table.model
        for (let i = arrayResult.length - 1; i >= 0; i--) {
            arrayResult[i] = new model(arrayResult[i])
        }
        return arrayResult
    },
    toMapIndexedBy: async function(indexingAttributeName) {
        const mapResult = new Map(),
            arrayResult = await this.toArray()
        for(let record of arrayResult) {
            if(record[indexingAttributeName] !== undefined) {
                mapResult.set(record[indexingAttributeName], record)
            }
        }
        return mapResult
    },
    toInstancesMapIndexedBy: async function(indexingAttributeName) {
        checkModelAssociation(this._ctx.table.model)
        const mapResult = new Map(),
            arrayResult = await this.toArray(),
            model = this._ctx.table.model
        for(let record of arrayResult) {
            if(record[indexingAttributeName] !== undefined) {
                mapResult.set(record[indexingAttributeName], new model(record))
            }
        }
        return mapResult
    },
    firstInstance: async function() {
        checkModelAssociation(this._ctx.table.model)
        const first = await this.first()
        if(first !== undefined) {
            return new this._ctx.table.model(first)
        }
    },
    lastInstance: async function() {
        checkModelAssociation(this._ctx.table.model)
        const last = await this.last()
        if(last !== undefined) {
            return new this._ctx.table.model(last)
        }
    },
    sortInstancesBy: async function(keyPath) {
        checkModelAssociation(this._ctx.table.model)
        const arrayResult = await this.sortBy(keyPath),
            model = this._ctx.table.model
        for (let i = arrayResult.length - 1; i >= 0; i--) {
            arrayResult[i] = new model(arrayResult[i])
        }
        return arrayResult
    }
}

export default function addCollectionMethods(db) {
    db.Collection.prototype.toInstancesArray = CollectionMethods.toInstancesArray

    db.Collection.prototype.toMapIndexedBy = CollectionMethods.toMapIndexedBy

    db.Collection.prototype.toInstancesMapIndexedBy = CollectionMethods.toInstancesMapIndexedBy

    db.Collection.prototype.firstInstance = CollectionMethods.firstInstance

    db.Collection.prototype.lastInstance = CollectionMethods.lastInstance

    db.Collection.prototype.sortInstancesBy = CollectionMethods.sortInstancesBy
}
