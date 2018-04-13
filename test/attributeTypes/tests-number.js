import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual} from './helper-functions'
import Number from '../../src/attributeTypes/Number'

module("AttributeTypes.Number")

test("AttributeTypes.Number", ( assert ) => {
    assert.equal(typeof Number, 'object', 'AttributeTypes.Number is an object')
})

test("AttributeTypes.Number.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, Number, options, [33, -32, 1, -1, 0, undefined, 53.0, 2, 433, -2, 3, -3, 4, 3.2, 3.122233, 3.444444, 1.0, 23.123, 3.2])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], null, {}, () => {}])
})

test("AttributeTypes.Number.validate with {min:…}", ( assert ) => {
    const options = { min: 2 }
    typeValidateOk(assert, Number, options, [33, 53.0, 2, 433, 3, 4, 3.2, undefined, 3.122233, 3.444444, 23.123, 3.2])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is lower than mininum', [-32, 1, -1, 0, -2, -3, 1.0])
})

test("AttributeTypes.Number.validate with {max:…}", ( assert ) => {
    const options = { max: 3 }
    typeValidateOk(assert, Number, options, [-32, 1, -1, 0, undefined, 2, -2, 3, -3, 1.0])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is higher than maximum', [33, 53.0, 433, 4, 3.2, 3.122233, 3.444444, 23.123, 3.2])
})

test("AttributeTypes.Number.validate with {min:…, max:…}", ( assert ) => {
    const options = { min: 1, max: 2 }
    typeValidateOk(assert, Number, options, [1, 2, undefined, 1.0])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is lower than mininum', [-32, -1, 0, -2, -3])
    typeValidateEqual(assert, Number, options, 'is higher than maximum', [33, 53.0, 3, 433, 4, 3.2, 3.122233, 3.444444, 23.123, 3.2])
})

module("AttributeTypes.Number with require=true")

test("AttributeTypes.Number.validate", ( assert ) => {
    const options = { require: true }
    typeValidateOk(assert, Number, options, [33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4, 3.2, 3.122233, 3.444444, 1.0, 23.123, 3.2])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], undefined, null, {}, () => {}])
})

test("AttributeTypes.Number.validate with {require: true, min:…}", ( assert ) => {
    const options = { require: true, min: 2 }
    typeValidateOk(assert, Number, options, [33, 53.0, 2, 433, 3, 4, 3.2, 3.122233, 3.444444, 23.123, 3.2])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], undefined, null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is lower than mininum', [-32, 1, -1, 0, -2, -3, 1.0])
})

test("AttributeTypes.Number.validate with {require: true, max:…}", ( assert ) => {
    const options = { require: true, max: 3 }
    typeValidateOk(assert, Number, options, [-32, 1, -1, 0, 2, -2, 3, -3, 1.0])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], undefined, null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is higher than maximum', [33, 53.0, 433, 4, 3.2, 3.122233, 3.444444, 23.123, 3.2])
})

test("AttributeTypes.Number.validate with {require: true, min:…, max:…}", ( assert ) => {
    const options = { require: true, min: 1, max: 2 }
    typeValidateOk(assert, Number, options, [1, 2, 1.0])
    typeValidateEqual(assert, Number, options, 'is not a Number', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', [], undefined, null, {}, () => {}])
    typeValidateEqual(assert, Number, options, 'is lower than mininum', [-32, -1, 0, -2, -3])
    typeValidateEqual(assert, Number, options, 'is higher than maximum', [33, 53.0, 3, 433, 4, 3.2, 3.122233, 3.444444, 23.123, 3.2])
})
