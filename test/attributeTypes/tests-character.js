import {module, test} from 'QUnit'
import {typeValidateOk, typeValidateEqual} from './helper-functions'
import Character from '../../src/attributeTypes/Character'

module("AttributeTypes.Character")

test("AttributeTypes.Character", ( assert ) => {
    assert.equal(typeof Character, 'object', 'AttributeTypes.Character is an object')
})

test("AttributeTypes.Character.validate", ( assert ) => {
    const options = undefined
    typeValidateOk(assert, Character, options, ['1', '0', '2', '3', '4', undefined, 'j'])
    typeValidateEqual(assert, Character, options, 'is not a Character', [3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda '])
})

test("AttributeTypes.Character.validate with {require: true}", ( assert ) => {
    const options = {require: true}
    typeValidateOk(assert, Character, options, ['1', '0', '2', '3', '4', 'j'])
    typeValidateEqual(assert, Character, options, 'is not a Character', [3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda '])
})
