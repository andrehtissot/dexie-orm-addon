import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { DateTime } = AttributeTypes()

module('AttributeTypes.DateTime')

test('AttributeTypes.DateTime', assert => {
    assert.equal(typeof DateTime, 'object', 'AttributeTypes.DateTime is an object')
})

test('AttributeTypes.DateTime.validate', assert => {
    const options = undefined
    typeValidateOk(assert, DateTime, options, [
        new Date(),
        undefined,
        new Date(2017, 1, 1, 1, 1, 1, 1),
        new Date(2017, 1, 1, 1, 1, 1, 2),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
})

test('AttributeTypes.DateTime.validate with {min:…}', assert => {
    const options = { min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [
        new Date(),
        undefined,
        new Date(2017, 1, 1, 1, 1, 1, 2),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})

test('AttributeTypes.DateTime.validate with {max:…}', assert => {
    const options = { max: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [
        new Date(2017, 1, 1, 1, 1, 1, 1),
        undefined,
        new Date(2017, 1, 1, 1, 1, 1, 2),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
})

test('AttributeTypes.DateTime.validate with {min:…, max:…}', assert => {
    const options = { max: new Date(2017, 1, 1, 1, 1, 1, 2), min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [undefined, new Date(2017, 1, 1, 1, 1, 1, 2)])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})
test('AttributeTypes.DateTime.validate with null', assert => {
    const options = null
    typeValidateOk(assert, DateTime, options, [
        new Date(),
        undefined,
        new Date(2017, 1, 1, 1, 1, 1, 1),
        new Date(2017, 1, 1, 1, 1, 1, 2),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
})

module('AttributeTypes.DateTime with require=true')

test('AttributeTypes.DateTime.validate with {require: true}', assert => {
    const options = { require: true }
    typeValidateOk(assert, DateTime, options, [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 1),
        new Date(2017, 1, 1, 1, 1, 1, 2),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
})

test('AttributeTypes.DateTime.validate with {require: true, min:…}', assert => {
    const options = { require: true, min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 2),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})

test('AttributeTypes.DateTime.validate with {require: true, max:…}', assert => {
    const options = { require: true, max: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [new Date(2017, 1, 1, 1, 1, 1, 1), new Date(2017, 1, 1, 1, 1, 1, 2)])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
})

test('AttributeTypes.DateTime.validate with {require: true, min:…, max:…}', assert => {
    const options = { require: true, max: new Date(2017, 1, 1, 1, 1, 1, 2), min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [new Date(2017, 1, 1, 1, 1, 1, 2)])
    // prettier-ignore
    typeValidateEqual(assert, DateTime, options, 'is not a Date', [ '33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now() ])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [
        new Date(),
        new Date(2017, 1, 1, 1, 1, 1, 3),
    ])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})
