/*!
 * Dexie ORM Addon {version} ({date})
 * https://github.com/andrehtissot/dexie-orm-wrapper
 *
 * Requires Dexie IndexedDB Addon
 * http://dexie.org
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 */

import MethodCalledWithoutAModelAssociatedException from './exceptions/MethodCalledWithoutAModelAssociatedException'

function checkModelAssociation(model){
    if(model === undefined) {
        throw new MethodCalledWithoutAModelAssociatedException()
    }
}

export default function addCollectionMethods(db) {
    db.Collection.prototype.toInstancesArray = async function() {
        checkModelAssociation(this._ctx.table.model)
        const arrayResult = await this.toArray(),
            model = this._ctx.table.model
        for (let i = arrayResult.length - 1; i >= 0; i--) {
            arrayResult[i] = new model(arrayResult[i])
        }
        return arrayResult
    }

    db.Collection.prototype.toMapIndexedBy = async function(indexingAttributeName) {
        const mapResult = new Map(),
            arrayResult = await this.toArray()
        for(let record of arrayResult) {
            if(record[indexingAttributeName] !== undefined) {
                mapResult.set(record[indexingAttributeName], record)
            }
        }
        return mapResult
    }

    db.Collection.prototype.toInstancesMapIndexedBy = async function(indexingAttributeName) {
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
    }

    db.Collection.prototype.firstInstance = async function() {
        checkModelAssociation(this._ctx.table.model)
        const first = await this.first()
        if(first !== undefined) {
            return new this._ctx.table.model(first)
        }
    }

    db.Collection.prototype.lastInstance = async function() {
        checkModelAssociation(this._ctx.table.model)
        const last = await this.last()
        if(last !== undefined) {
            return new this._ctx.table.model(last)
        }
    }

    db.Collection.prototype.sortInstancesBy = async function(keyPath) {
        checkModelAssociation(this._ctx.table.model)
        const arrayResult = await this.sortBy(keyPath),
            model = this._ctx.table.model
        for (let i = arrayResult.length - 1; i >= 0; i--) {
            arrayResult[i] = new model(arrayResult[i])
        }
        return arrayResult
    }
}
