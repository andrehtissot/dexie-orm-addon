import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { ObjectType } = AttributeTypes()

module('ObjectType')

test('ObjectType', (assert) => {
    assert.equal(typeof ObjectType, 'object', 'ObjectType is an object')
})

test('ObjectType.validate', (assert) => {
    const options = undefined
    typeValidateOk(assert, ObjectType, options, [{ attr: 'value' }, undefined, {}])
    // prettier-ignore
    typeValidateEqual(assert, ObjectType, options, 'is not an Object', [ 33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', () => {} ])
    typeValidateEqual(assert, ObjectType, options, 'is null', [null])
})

test('ObjectType.validate with {allowNull:true}', (assert) => {
    const options = { allowNull: true }
    typeValidateOk(assert, ObjectType, options, [{ attr: 'value' }, undefined, {}, null])
    // prettier-ignore
    typeValidateEqual(assert, ObjectType, options, 'is not an Object', [ 33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', () => {} ])
})

test('ObjectType.validate with null', (assert) => {
    const options = null
    typeValidateOk(assert, ObjectType, options, [{ attr: 'value' }, undefined, {}])
    // prettier-ignore
    typeValidateEqual(assert, ObjectType, options, 'is not an Object', [ 33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', () => {} ])
    typeValidateEqual(assert, ObjectType, options, 'is null', [null])
})

module('ObjectType with require=true')

test('ObjectType.validate with {require:true}', (assert) => {
    const options = { require: true }
    typeValidateOk(assert, ObjectType, options, [{ attr: 'value' }, {}])
    // prettier-ignore
    typeValidateEqual(assert, ObjectType, options, 'is not an Object', [ 33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, () => {} ])
    typeValidateEqual(assert, ObjectType, options, 'is null', [null])
})

test('ObjectType.validate with {require:true, allowNull:true}', (assert) => {
    const options = { require: true, allowNull: true }
    typeValidateOk(assert, ObjectType, options, [{ attr: 'value' }, {}, null])
    // prettier-ignore
    typeValidateEqual(assert, ObjectType, options, 'is not an Object', [ 33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, () => {} ])
})
