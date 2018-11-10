import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual, AttributeTypes} from './helper-functions'

const { Boolean } = AttributeTypes()

module("AttributeTypes.Boolean")

test("AttributeTypes.Boolean", ( assert ) => {
    assert.equal(typeof Boolean, 'object', 'AttributeTypes.Boolean is an object')
})

test("AttributeTypes.Boolean.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, Boolean, options, [undefined, true, false])
    typeValidateEqual(assert, Boolean, options, 'is not a Boolean', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.Boolean.validate with {require: true}", ( assert ) => {
    const options = {require: true}
    typeValidateOk(assert, Boolean, options, [true, false])
    typeValidateEqual(assert, Boolean, options, 'is not a Boolean', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.Boolean.validate with null", ( assert ) => {
    const options = null
    typeValidateOk(assert, Boolean, options, [undefined, true, false])
    typeValidateEqual(assert, Boolean, options, 'is not a Boolean', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})
