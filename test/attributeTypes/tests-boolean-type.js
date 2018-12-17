import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { BooleanType } = AttributeTypes()

module('BooleanType')

test('BooleanType', assert => {
    assert.equal(typeof BooleanType, 'object', 'BooleanType is an object')
})

test('BooleanType.validate', assert => {
    document.TEEEEEEEEST = BooleanType
    const options = undefined
    typeValidateOk(assert, BooleanType, options, [undefined, true, false])
    // prettier-ignore
    typeValidateEqual(assert, BooleanType, options, 'is not a Boolean', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('BooleanType.validate with {require: true}', assert => {
    const options = { require: true }
    typeValidateOk(assert, BooleanType, options, [true, false])
    // prettier-ignore
    typeValidateEqual(assert, BooleanType, options, 'is not a Boolean', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('BooleanType.validate with null', assert => {
    const options = null
    typeValidateOk(assert, BooleanType, options, [undefined, true, false])
    // prettier-ignore
    typeValidateEqual(assert, BooleanType, options, 'is not a Boolean', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})
