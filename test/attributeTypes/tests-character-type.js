import { module, test } from 'QUnit'
import { typeValidateOk, typeValidateEqual, AttributeTypes } from './helper-functions'

const { CharacterType } = AttributeTypes()

module('CharacterType')

test('CharacterType', (assert) => {
    assert.equal(typeof CharacterType, 'object', 'Character is an object')
})

test('CharacterType.validate', (assert) => {
    const options = undefined
    typeValidateOk(assert, CharacterType, options, ['1', '0', '2', '3', '4', undefined, 'j'])
    // prettier-ignore
    typeValidateEqual(assert, CharacterType, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})

test('CharacterType.validate with {require: true}', (assert) => {
    const options = { require: true }
    typeValidateOk(assert, CharacterType, options, ['1', '0', '2', '3', '4', 'j'])
    // prettier-ignore
    typeValidateEqual(assert, CharacterType, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), undefined, null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})

test('CharacterType.validate with null', (assert) => {
    const options = null
    typeValidateOk(assert, CharacterType, options, ['1', '0', '2', '3', '4', undefined, 'j'])
    // prettier-ignore
    typeValidateEqual(assert, CharacterType, options, 'is not a Character', [ 3.2, {}, () => {}, new Date(), null, -32, -1, 0, -2, -3, 33, 53.0, 433, 3, 4, '33', '-32', '-1', '', '53.0', '433', '-2', '-3', 'sada', '3.2', 'isds', 'sda sda ' ])
})
