import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual, AttributeTypes} from './helper-functions'

const { Integer } = AttributeTypes()

module("AttributeTypes.Integer")

test("AttributeTypes.Integer", ( assert ) => {
    assert.equal(typeof Integer, 'object', 'AttributeTypes.Integer is an object')
})

test("AttributeTypes.Integer.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, Integer, options, [33, -32, undefined, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', null, {}, () => {}])
})

test("AttributeTypes.Integer.validate with {min:…}", ( assert ) => {
    const options = { min: 2 }
    typeValidateOk(assert, Integer, options, [33, undefined, 53.0, 2, 433, 3, 4])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is lower than mininum', [-32, 1, -1, 0, -2, -3])
})

test("AttributeTypes.Integer.validate with {max:…}", ( assert ) => {
    const options = { max: 3 }
    typeValidateOk(assert, Integer, options, [-32, 1, undefined, -1, 0, 2, -2, 3, -3])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is higher than maximum', [4, 433, 53.0, 33])
})

test("AttributeTypes.Integer.validate with {min:…, max:…}", ( assert ) => {
    const options = { min: 1, max: 2 }
    typeValidateOk(assert, Integer, options, [1, undefined, 2])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is lower than mininum', [-32, -1, 0, -2, -3])
    typeValidateEqual(assert, Integer, options, 'is higher than maximum', [33, 53.0, 433, 3, 4])
})

module("AttributeTypes.Integer with require=true")

test("AttributeTypes.Integer.validate with {require: true}", ( assert ) => {
    const options = { require: true }
    typeValidateOk(assert, Integer, options, [33, -32, 1, -1, 0, 53.0, 2, 433, -2, 3, -3, 4])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, null, {}, () => {}])
})

test("AttributeTypes.Integer.validate with {require: true, min:…}", ( assert ) => {
    const options = { require: true, min: 2 }
    typeValidateOk(assert, Integer, options, [33, 53.0, 2, 433, 3, 4])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is lower than mininum', [-32, 1, -1, 0, -2, -3])
})

test("AttributeTypes.Integer.validate with {require: true, max:…}", ( assert ) => {
    const options = { require: true, max: 3 }
    typeValidateOk(assert, Integer, options, [-32, 1, -1, 0, 2, -2, 3, -3])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is higher than maximum', [4, 433, 53.0, 33])
})

test("AttributeTypes.Integer.validate with {require: true, min:…, max:…}", ( assert ) => {
    const options = { require: true, min: 1, max: 2 }
    typeValidateOk(assert, Integer, options, [1, 2])
    typeValidateEqual(assert, Integer, options, 'is not an Integer', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', 3.2, 3.122233, 3.444444, 23.123, 3.2, '3.2', undefined, null, {}, () => {}])
    typeValidateEqual(assert, Integer, options, 'is lower than mininum', [-32, -1, 0, -2, -3])
    typeValidateEqual(assert, Integer, options, 'is higher than maximum', [33, 53.0, 433, 3, 4])
})
