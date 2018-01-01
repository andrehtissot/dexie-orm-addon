import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual} from './helper-functions'
import TypeObject from '../../src/attributeTypes/Object'

module("AttributeTypes.Object")

test("AttributeTypes.Object", ( assert ) => {
    assert.equal(typeof TypeObject, 'object', 'AttributeTypes.Object is an object')
})

test("AttributeTypes.Object.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, TypeObject, options, [{ attr: 'value' }, {}])
    typeValidateEqual(assert, TypeObject, options, 'is not an Object', [33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, () => {}])
    typeValidateEqual(assert, TypeObject, options, 'is null', [null])
})


test("AttributeTypes.Object.validate with {allowNull:true}", ( assert ) => {
    const options = { allowNull: true }
    typeValidateOk(assert, TypeObject, options, [{ attr: 'value' }, {}, null])
    typeValidateEqual(assert, TypeObject, options, 'is not an Object', [33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, () => {}])
})
