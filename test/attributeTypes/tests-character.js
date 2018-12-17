import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { Character } = AttributeTypes()

module('AttributeTypes.Character')

test('AttributeTypes.Character', assert => {
    assert.equal(typeof Character, 'object', 'AttributeTypes.Character is an object')
})

test('AttributeTypes.Character.validate', assert => {
    const options = undefined
    typeValidateOk(assert, Character, options, ['1', '0', '2', '3', '4', undefined, 'j'])
    // prettier-ignore
    typeValidateEqual(assert, Character, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})

test('AttributeTypes.Character.validate with {require: true}', assert => {
    const options = { require: true }
    typeValidateOk(assert, Character, options, ['1', '0', '2', '3', '4', 'j'])
    // prettier-ignore
    typeValidateEqual(assert, Character, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})

test('AttributeTypes.Character.validate with null', assert => {
    const options = null
    typeValidateOk(assert, Character, options, ['1', '0', '2', '3', '4', undefined, 'j'])
    // prettier-ignore
    typeValidateEqual(assert, Character, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})
