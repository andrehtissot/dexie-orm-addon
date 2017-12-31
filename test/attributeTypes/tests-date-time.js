import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual} from './helper-functions'
import DateTime from '../../src/attributeTypes/DateTime'

module("AttributeTypes.DateTime")

test("AttributeTypes.DateTime", ( assert ) => {
    assert.equal(typeof DateTime, 'object', 'AttributeTypes.DateTime is an object')
})

test("AttributeTypes.DateTime.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, DateTime, options, [new Date(), new Date(2017, 1, 1, 1, 1, 1, 1), new Date(2017, 1, 1, 1, 1, 1, 2), new Date(2017, 1, 1, 1, 1, 1, 3)])
    typeValidateEqual(assert, DateTime, options, 'is not a Date', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now()])
})

test("AttributeTypes.DateTime.validate with {min:…}", ( assert ) => {
    const options = { min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [new Date(), new Date(2017, 1, 1, 1, 1, 1, 2), new Date(2017, 1, 1, 1, 1, 1, 3)])
    typeValidateEqual(assert, DateTime, options, 'is not a Date', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now()])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})

test("AttributeTypes.DateTime.validate with {max:…}", ( assert ) => {
    const options = { max: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [new Date(2017, 1, 1, 1, 1, 1, 1), new Date(2017, 1, 1, 1, 1, 1, 2)])
    typeValidateEqual(assert, DateTime, options, 'is not a Date', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now()])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [new Date(), new Date(2017, 1, 1, 1, 1, 1, 3)])
})

test("AttributeTypes.DateTime.validate with {min:…,max:…}", ( assert ) => {
    const options = { max: new Date(2017, 1, 1, 1, 1, 1, 2), min: new Date(2017, 1, 1, 1, 1, 1, 2) }
    typeValidateOk(assert, DateTime, options, [new Date(2017, 1, 1, 1, 1, 1, 2)])
    typeValidateEqual(assert, DateTime, options, 'is not a Date', ['33', '-32', '1', '-1', '0', '', '53.0', '2', '433', '-2', '3', '-3', '4', 'j', 'sada', '3.2', 'isds', 'sda sda ', 3.2, {}, () => {}, undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, Date.now()])
    typeValidateEqual(assert, DateTime, options, 'is higher than maximum', [new Date(), new Date(2017, 1, 1, 1, 1, 1, 3)])
    typeValidateEqual(assert, DateTime, options, 'is lower than mininum', [new Date(2017, 1, 1, 1, 1, 1, 1)])
})
