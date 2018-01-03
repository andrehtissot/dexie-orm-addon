/*!
 * Dexie ORM Addon {version} ({date})
 * https://github.com/andrehtissot/dexie-orm-addon
 *
 * Requires Dexie IndexedDB Addon
 * http://dexie.org
 *
 * Copyright André Augusto Tissot
 * Released under the MIT license
 */

import MethodCalledWithoutAModelAssociatedException from './exceptions/MethodCalledWithoutAModelAssociatedException'

export default function addTableMethods(db) {
    db.Table.prototype.toInstancesArray = function() {
        return this.toCollection().toInstancesArray()
    }

    db.Table.prototype.toMapIndexedBy = function(indexingAttributeName) {
        return this.toCollection().toMapIndexedBy(indexingAttributeName)
    }

    db.Table.prototype.toInstancesMapIndexedBy = function(indexingAttributeName) {
        return this.toCollection().toInstancesMapIndexedBy(indexingAttributeName)
    }

    db.Table.prototype.first = function() {
        return this.toCollection().first()
    }

    db.Table.prototype.firstInstance = function() {
        return this.toCollection().firstInstance()
    }

    db.Table.prototype.last = function() {
        return this.toCollection().last()
    }

    db.Table.prototype.lastInstance = function() {
        return this.toCollection().lastInstance()
    }

    db.Table.prototype.getInstance = async function(...args) {
        const found = await this.get(...args)
        if(found !== undefined) {
            return new this.model(found)
        }
    }
}
