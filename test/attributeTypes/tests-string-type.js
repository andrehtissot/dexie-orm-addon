import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { StringType } = AttributeTypes()

module('StringType')

test('StringType', assert => {
    assert.equal(typeof StringType, 'object', 'StringType is an object')
})

test('StringType.validate', assert => {
    const options = undefined
    // prettier-ignore
    typeValidateOk(assert, StringType, options, [ '33', undefined, '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {minLength:…}', assert => {
    const options = { minLength: 2 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, [ '33', '-32', '-1', '53.0', '433', '-2', '-3', undefined, 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is lower than mininum", [ '1', '0', '', '2', '3', '4', 'j' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {maxLength:…}', assert => {
    const options = { maxLength: 2 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, ['33', '1', '0', '', '2', undefined, '-2', '3', '-3', '4', 'j'])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is higher than maximum", [ '53.0', '433', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {minLength:…,maxLength:…}', assert => {
    const options = { minLength: 2, maxLength: 3 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, ['33', '-32', '-1', '433', undefined, '-2', '-3', '3.2'])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is higher than maximum", [ '53.0', 'sada', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is lower than mininum", [ '1', '0', '', '2', '3', '4', 'j' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with null', assert => {
    const options = null
    // prettier-ignore
    typeValidateOk(assert, StringType, options, [ '33', undefined, '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

module('StringType with require=true')

test('StringType.validate with {require:true}', assert => {
    const options = { require: true }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {require:true, minLength:…}', assert => {
    const options = { require: true, minLength: 2 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, [ '33', '-32', '-1', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is lower than mininum", [ '1', '0', '', '2', '3', '4', 'j' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {require:true, maxLength:…}', assert => {
    const options = { require: true, maxLength: 2 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, ['33', '1', '0', '', '2', '-2', '3', '-3', '4', 'j'])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is higher than maximum", [ '53.0', '433', 'sada', '3.2', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})

test('StringType.validate with {require:true, minLength:…, maxLength:…}', assert => {
    const options = { require: true, minLength: 2, maxLength: 3 }
    // prettier-ignore
    typeValidateOk(assert, StringType, options, ['33', '-32', '-1', '433', '-2', '-3', '3.2'])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is higher than maximum", [ '53.0', 'sada', 'isds', 'sda sda ' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, "has it's length is lower than mininum", [ '1', '0', '', '2', '3', '4', 'j' ])
    // prettier-ignore
    typeValidateEqual(assert, StringType, options, 'is not a String', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4 ])
})
