import {test} from 'QUnit'

export default function asyncTest(testDescription, testFunction, options = { autoDone: true }) {
    test(testDescription, ( assert ) => {
        var asyncDone = assert.async()
        testFunction(assert, asyncDone).then(() => {
            if(options.autoDone === true) {
                asyncDone()
            }
        }).catch((e) => {
            if(options.autoDone === true || options.autoDone === 'on failure') {
                asyncDone()
            }
            assert.notOk(e.message)
            e.testDescription = testDescription
            throw e
        })
    })
}