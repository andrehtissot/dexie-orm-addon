import MethodCalledWithoutAModelAssociatedException from './exceptions/MethodCalledWithoutAModelAssociatedException'

const TableMethods = {
    toInstancesArray: function() {
        return this.toCollection().toInstancesArray()
    },
    toMapIndexedBy: function(indexingAttributeName) {
        return this.toCollection().toMapIndexedBy(indexingAttributeName)
    },
    toInstancesMapIndexedBy: function(indexingAttributeName) {
        return this.toCollection().toInstancesMapIndexedBy(indexingAttributeName)
    },
    first: function() {
        return this.toCollection().first()
    },
    firstInstance: function() {
        return this.toCollection().firstInstance()
    },
    last: function() {
        return this.toCollection().last()
    },
    lastInstance: function() {
        return this.toCollection().lastInstance()
    },
    getInstance: async function(...args) {
        const found = await this.get(...args)
        if(found !== undefined) {
            return new this.model(found)
        }
    }
}

export default function addTableMethods(db) {
    db.Table.prototype.toInstancesArray = TableMethods.toInstancesArray
    db.Table.prototype.toMapIndexedBy = TableMethods.toMapIndexedBy
    db.Table.prototype.toInstancesMapIndexedBy = TableMethods.toInstancesMapIndexedBy
    db.Table.prototype.first = TableMethods.first
    db.Table.prototype.firstInstance = TableMethods.firstInstance
    db.Table.prototype.last = TableMethods.last
    db.Table.prototype.lastInstance = TableMethods.lastInstance
    db.Table.prototype.getInstance = TableMethods.getInstance
}
