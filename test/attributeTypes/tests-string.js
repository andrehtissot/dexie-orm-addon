import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual, AttributeTypes} from './helper-functions'

const { String } = AttributeTypes()

module("AttributeTypes.String")

test("AttributeTypes.String", ( assert ) => {
    assert.equal(typeof String, 'object', 'AttributeTypes.String is an object')
})

test("AttributeTypes.String.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, String, options, ['33', undefined, '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {minLength:…}", ( assert ) => {
    const options = { minLength: 2 }
    typeValidateOk(assert, String, options, ['33', '-32', '-1', '53.0', '433', '-2', '-3', undefined, 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, "has it's length is lower than mininum", ['1', '0', '', '2', '3', '4', 'j'])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {maxLength:…}", ( assert ) => {
    const options = { maxLength: 2 }
    typeValidateOk(assert, String, options, ['33', '1', '0', '', '2', undefined, '-2', '3', '-3', '4', 'j'])
    typeValidateEqual(assert, String, options, "has it's length is higher than maximum", ['53.0', '433', 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {minLength:…,maxLength:…}", ( assert ) => {
    const options = { minLength: 2, maxLength: 3 }
    typeValidateOk(assert, String, options, ['33', '-32', '-1', '433', undefined, '-2', '-3', '3.2'])
    typeValidateEqual(assert, String, options, "has it's length is higher than maximum", ['53.0', 'sada', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, "has it's length is lower than mininum", ['1', '0', '', '2', '3', '4', 'j'])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

module("AttributeTypes.String with require=true")

test("AttributeTypes.String.validate with {require:true}", ( assert ) => {
    const options = { require: true }
    typeValidateOk(assert, String, options, ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {require:true, minLength:…}", ( assert ) => {
    const options = { require: true, minLength: 2 }
    typeValidateOk(assert, String, options, ['33', '-32', '-1', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, "has it's length is lower than mininum", ['1', '0', '', '2', '3', '4', 'j'])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {require:true, maxLength:…}", ( assert ) => {
    const options = { require: true, maxLength: 2 }
    typeValidateOk(assert, String, options, ['33', '1', '0', '', '2', '-2', '3', '-3', '4', 'j'])
    typeValidateEqual(assert, String, options, "has it's length is higher than maximum", ['53.0', '433', 'sada', '3.2', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})

test("AttributeTypes.String.validate with {require:true, minLength:…, maxLength:…}", ( assert ) => {
    const options = { require: true, minLength: 2, maxLength: 3 }
    typeValidateOk(assert, String, options, ['33', '-32', '-1', '433', '-2', '-3', '3.2'])
    typeValidateEqual(assert, String, options, "has it's length is higher than maximum", ['53.0', 'sada', 'isds', 'sda sda '])
    typeValidateEqual(assert, String, options, "has it's length is lower than mininum", ['1', '0', '', '2', '3', '4', 'j'])
    typeValidateEqual(assert, String, options, 'is not a String', [3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4])
})
