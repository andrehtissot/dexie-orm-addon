
export function typeValidateOk(assert, type, options, examples) {
    for(let example of examples) {
        assert.ok(type.validate(example, options), example+' should be valid')
    }
}

export function typeValidateEqual(assert, type, options, expectedResult, examples) {
    for(let example of examples) {
        assert.equal(type.validate(example, options), expectedResult, JSON.stringify(example)+' '+expectedResult)
    }
}